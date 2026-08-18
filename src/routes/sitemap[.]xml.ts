import { createFileRoute } from "@tanstack/react-router";

const SITE_URL = "https://bookyourserviceconnect.in";

const staticPages = [
  {
    path: "/",
    priority: "1.0",
  },
  {
    path: "/services",
    priority: "0.9",
  },
  {
    path: "/search",
    priority: "0.6",
  },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().split("T")[0];

        const urls = staticPages
          .map(
            ({ path, priority }) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`,
          )
          .join("");

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

        return new Response(sitemap, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, s-maxage=86400",
          },
        });
      },
    },
  },
});
