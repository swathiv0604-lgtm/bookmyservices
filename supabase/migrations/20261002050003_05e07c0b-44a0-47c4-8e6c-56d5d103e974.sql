DROP POLICY IF EXISTS "Admins delete reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins read all reviews" ON public.reviews;
DROP POLICY IF EXISTS "Public reads approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Admins delete images" ON public.review_images;
DROP POLICY IF EXISTS "Admins read all images" ON public.review_images;
DROP POLICY IF EXISTS "Public reads images of approved reviews" ON public.review_images;

CREATE OR REPLACE FUNCTION public.review_summary(_service_slug text DEFAULT NULL::text)
 RETURNS TABLE(average numeric, total bigint, five bigint, four bigint, three bigint, two bigint, one bigint)
 LANGUAGE sql STABLE SET search_path TO 'public'
AS $$
  select coalesce(round(avg(rating)::numeric, 1), 0), count(*),
    count(*) filter (where rating = 5), count(*) filter (where rating = 4),
    count(*) filter (where rating = 3), count(*) filter (where rating = 2),
    count(*) filter (where rating = 1)
  from public.reviews
  where (_service_slug is null or service_slug = _service_slug)
$$;

ALTER TABLE public.reviews DROP COLUMN IF EXISTS status, DROP COLUMN IF EXISTS moderated_by, DROP COLUMN IF EXISTS moderated_at, DROP COLUMN IF EXISTS moderation_note;
DROP TYPE IF EXISTS public.review_status;

REVOKE INSERT, UPDATE, DELETE ON public.reviews FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.review_images FROM anon, authenticated;
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT SELECT ON public.review_images TO anon, authenticated;
CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can read review images" ON public.review_images FOR SELECT TO anon, authenticated USING (true);

DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP TABLE IF EXISTS public.user_roles;
DROP TYPE IF EXISTS public.app_role;