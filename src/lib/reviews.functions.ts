import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const BUCKET = "review-photos";
export const REVIEW_LIMITS = {
  nameMin: 2,
  nameMax: 60,
  bodyMin: 20,
  bodyMax: 1000,
  maxPhotos: 4,
  maxPhotoBytes: 1_500_000,
  pageSize: 6,
} as const;

export type PublicReview = {
  id: string;
  displayName: string;
  rating: number;
  body: string;
  serviceName: string | null;
  serviceSlug: string | null;
  createdAt: string;
  photos: string[];
};

export type ReviewSummary = {
  average: number;
  total: number;
  distribution: Record<1 | 2 | 3 | 4 | 5, number>;
};

export type ModerationReview = PublicReview & {
  status: "pending" | "approved" | "rejected";
  moderationNote: string | null;
};

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Strip control / zero-width characters and collapse excessive whitespace. */
function clean(text: string) {
  return text
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028-\u202E\uFEFF]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** "Priya Sharma" -> "Priya S." — never publish full surnames. */
function publicName(name: string) {
  const parts = clean(name).split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Customer";
  const first = parts[0].slice(0, 30);
  return parts.length > 1 ? `${first} ${parts[parts.length - 1][0].toUpperCase()}.` : first;
}

function detectImage(bytes: Uint8Array): "image/jpeg" | "image/png" | "image/webp" | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "image/jpeg";
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) return "image/png";
  const riff = String.fromCharCode(...bytes.slice(0, 4));
  const webp = String.fromCharCode(...bytes.slice(8, 12));
  if (riff === "RIFF" && webp === "WEBP") return "image/webp";
  return null;
}

async function sha256(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type Row = {
  id: string;
  display_name: string;
  rating: number;
  body: string;
  service_name: string | null;
  service_slug: string | null;
  created_at: string;
  status?: "pending" | "approved" | "rejected";
  moderation_note?: string | null;
  review_images: { storage_path: string; sort_order: number }[];
};

async function signPhotos(rows: Row[]) {
  const paths = rows.flatMap((r) => r.review_images.map((i) => i.storage_path));
  const map = new Map<string, string>();
  if (paths.length) {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin.storage.from(BUCKET).createSignedUrls(paths, 60 * 60);
    data?.forEach((d) => d.path && d.signedUrl && map.set(d.path, d.signedUrl));
  }
  return (r: Row) =>
    [...r.review_images]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((i) => map.get(i.storage_path))
      .filter((u): u is string => Boolean(u));
}

const listSchema = z.object({
  serviceSlug: z.string().max(120).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  offset: z.number().int().min(0).max(10_000).default(0),
});

export const listReviews = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => listSchema.parse(d ?? {}))
  .handler(async ({ data }) => {
    const sb = publicClient();
    let q = sb
      .from("reviews")
      .select("id, display_name, rating, body, service_name, service_slug, created_at, review_images(storage_path, sort_order)")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .range(data.offset, data.offset + REVIEW_LIMITS.pageSize);
    if (data.serviceSlug) q = q.eq("service_slug", data.serviceSlug);
    if (data.rating) q = q.eq("rating", data.rating);

    const [{ data: rows, error }, { data: sum }] = await Promise.all([
      q,
      sb.rpc("review_summary", { _service_slug: data.serviceSlug ?? undefined }),
    ]);
    if (error) {
      console.error("listReviews", error);
      throw new Error("Reviews are unavailable right now.");
    }
    const list = (rows ?? []) as Row[];
    const hasMore = list.length > REVIEW_LIMITS.pageSize;
    const page = list.slice(0, REVIEW_LIMITS.pageSize);
    const photosFor = await signPhotos(page);
    const s = sum?.[0];
    const summary: ReviewSummary = {
      average: Number(s?.average ?? 0),
      total: Number(s?.total ?? 0),
      distribution: {
        5: Number(s?.five ?? 0),
        4: Number(s?.four ?? 0),
        3: Number(s?.three ?? 0),
        2: Number(s?.two ?? 0),
        1: Number(s?.one ?? 0),
      },
    };
    const reviews: PublicReview[] = page.map((r) => ({
      id: r.id,
      displayName: r.display_name,
      rating: r.rating,
      body: r.body,
      serviceName: r.service_name,
      serviceSlug: r.service_slug,
      createdAt: r.created_at,
      photos: photosFor(r),
    }));
    return { reviews, summary, hasMore };
  });

const submitSchema = z.object({
  name: z.string().trim().min(REVIEW_LIMITS.nameMin).max(REVIEW_LIMITS.nameMax),
  rating: z.number().int().min(1).max(5),
  body: z.string().trim().min(REVIEW_LIMITS.bodyMin).max(REVIEW_LIMITS.bodyMax),
  serviceSlug: z.string().trim().max(120).nullable(),
  serviceName: z.string().trim().max(160).nullable(),
  photos: z
    .array(z.string().max(2_200_000).regex(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/))
    .max(REVIEW_LIMITS.maxPhotos),
  website: z.string().max(0).optional(), // honeypot — must stay empty
});

export const submitReview = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => submitSchema.parse(d))
  .handler(async ({ data }) => {
    const name = clean(data.name);
    const body = clean(data.body);
    if (name.length < REVIEW_LIMITS.nameMin || !/\p{L}/u.test(name)) {
      return { ok: false as const, error: "Please enter your name." };
    }
    const words = body.split(/\s+/).filter((w) => /\p{L}{2,}/u.test(w));
    if (body.length < REVIEW_LIMITS.bodyMin || words.length < 4 || /(.)\1{9,}/.test(body)) {
      return { ok: false as const, error: "Please describe your experience in a few more words." };
    }

    // Decode + verify real file signatures before touching storage.
    const images: { bytes: Uint8Array; type: string; ext: string }[] = [];
    for (const url of data.photos) {
      const b64 = url.slice(url.indexOf(",") + 1);
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      if (bytes.byteLength > REVIEW_LIMITS.maxPhotoBytes) {
        return { ok: false as const, error: "One of the photos is too large." };
      }
      const type = detectImage(bytes);
      if (!type) return { ok: false as const, error: "Only JPG, PNG or WEBP photos are allowed." };
      images.push({ bytes, type, ext: type.split("/")[1].replace("jpeg", "jpg") });
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Rate limit: 3 submissions per client per hour.
    const ip =
      getRequestHeader("cf-connecting-ip") ??
      getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const clientHash = await sha256(`${ip}|${getRequestHeader("user-agent") ?? ""}`);
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("review_submission_log")
      .select("id", { count: "exact", head: true })
      .eq("client_hash", clientHash)
      .gte("created_at", since);
    if ((count ?? 0) >= 3) {
      return { ok: false as const, error: "You've submitted several reviews recently. Please try again later." };
    }

    // Duplicate protection: identical text already submitted.
    const { count: dup } = await supabaseAdmin
      .from("reviews")
      .select("id", { count: "exact", head: true })
      .eq("body", body);
    if ((dup ?? 0) > 0) {
      return { ok: false as const, error: "This review has already been submitted." };
    }

    const { data: review, error } = await supabaseAdmin
      .from("reviews")
      .insert({
        display_name: publicName(name),
        rating: data.rating,
        body,
        service_slug: data.serviceSlug,
        service_name: data.serviceName ? clean(data.serviceName) : null,
        status: "pending",
      })
      .select("id")
      .single();
    if (error || !review) {
      console.error("submitReview insert", error);
      return { ok: false as const, error: "We couldn't save your review. Please try again." };
    }

    const uploaded: string[] = [];
    try {
      for (const [i, img] of images.entries()) {
        const path = `${review.id}/${crypto.randomUUID()}.${img.ext}`;
        const { error: upErr } = await supabaseAdmin.storage
          .from(BUCKET)
          .upload(path, img.bytes, { contentType: img.type, upsert: false });
        if (upErr) throw upErr;
        uploaded.push(path);
        const { error: rowErr } = await supabaseAdmin
          .from("review_images")
          .insert({ review_id: review.id, storage_path: path, sort_order: i });
        if (rowErr) throw rowErr;
      }
    } catch (e) {
      console.error("submitReview photos", e);
      if (uploaded.length) await supabaseAdmin.storage.from(BUCKET).remove(uploaded);
      await supabaseAdmin.from("reviews").delete().eq("id", review.id);
      return { ok: false as const, error: "Your photos couldn't be uploaded. Please try again." };
    }

    await supabaseAdmin.from("review_submission_log").insert({ client_hash: clientHash });
    return { ok: true as const };
  });

async function assertAdmin(supabase: { rpc: (...a: never[]) => unknown }, userId: string) {
  const { data } = await (supabase as unknown as {
    rpc: (fn: string, args: object) => Promise<{ data: boolean | null }>;
  }).rpc("has_role", { _user_id: userId, _role: "admin" });
  if (!data) throw new Response("Forbidden", { status: 403 });
}

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    return { isAdmin: Boolean(data) };
  });

export const listModerationQueue = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ status: z.enum(["pending", "approved", "rejected"]) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    const { data: rows, error } = await context.supabase
      .from("reviews")
      .select(
        "id, display_name, rating, body, service_name, service_slug, created_at, status, moderation_note, review_images(storage_path, sort_order)",
      )
      .eq("status", data.status)
      .order("created_at", { ascending: data.status === "pending" })
      .limit(100);
    if (error) throw new Error("Could not load reviews.");
    const list = (rows ?? []) as Row[];
    const photosFor = await signPhotos(list);
    return list.map(
      (r): ModerationReview => ({
        id: r.id,
        displayName: r.display_name,
        rating: r.rating,
        body: r.body,
        serviceName: r.service_name,
        serviceSlug: r.service_slug,
        createdAt: r.created_at,
        status: r.status ?? "pending",
        moderationNote: r.moderation_note ?? null,
        photos: photosFor(r),
      }),
    );
  });

export const moderateReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        action: z.enum(["approve", "reject", "delete"]),
        note: z.string().trim().max(300).optional(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase as never, context.userId);
    if (data.action === "delete") {
      const { data: imgs } = await context.supabase
        .from("review_images")
        .select("storage_path")
        .eq("review_id", data.id);
      const { error } = await context.supabase.from("reviews").delete().eq("id", data.id);
      if (error) throw new Error("Could not remove the review.");
      if (imgs?.length) {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        await supabaseAdmin.storage.from(BUCKET).remove(imgs.map((i) => i.storage_path));
      }
      return { ok: true };
    }
    const { error } = await context.supabase
      .from("reviews")
      .update({
        status: data.action === "approve" ? "approved" : "rejected",
        moderated_by: context.userId,
        moderated_at: new Date().toISOString(),
        moderation_note: data.note ? clean(data.note) : null,
      })
      .eq("id", data.id);
    if (error) throw new Error("Could not update the review.");
    return { ok: true };
  });
