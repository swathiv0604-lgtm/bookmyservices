create type public.app_role as enum ('admin', 'moderator', 'user');
create type public.review_status as enum ('pending', 'approved', 'rejected');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  display_name text not null check (char_length(display_name) between 2 and 60),
  rating smallint not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 20 and 1000),
  service_slug text,
  service_name text,
  status review_status not null default 'pending',
  moderated_by uuid,
  moderated_at timestamptz,
  moderation_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index reviews_status_created_idx on public.reviews (status, created_at desc);
create index reviews_service_idx on public.reviews (service_slug, status);
grant select on public.reviews to anon;
grant select, update, delete on public.reviews to authenticated;
grant all on public.reviews to service_role;
alter table public.reviews enable row level security;
create policy "Public reads approved reviews" on public.reviews for select to anon, authenticated using (status = 'approved');
create policy "Admins read all reviews" on public.reviews for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update reviews" on public.reviews for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete reviews" on public.reviews for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.review_images (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.reviews(id) on delete cascade,
  storage_path text not null,
  sort_order smallint not null default 0,
  created_at timestamptz not null default now()
);
create index review_images_review_idx on public.review_images (review_id);
grant select on public.review_images to anon;
grant select, delete on public.review_images to authenticated;
grant all on public.review_images to service_role;
alter table public.review_images enable row level security;
create policy "Public reads images of approved reviews" on public.review_images for select to anon, authenticated
  using (exists (select 1 from public.reviews r where r.id = review_id and r.status = 'approved'));
create policy "Admins read all images" on public.review_images for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete images" on public.review_images for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create table public.review_submission_log (
  id uuid primary key default gen_random_uuid(),
  client_hash text not null,
  created_at timestamptz not null default now()
);
create index review_submission_log_idx on public.review_submission_log (client_hash, created_at desc);
grant all on public.review_submission_log to service_role;
alter table public.review_submission_log enable row level security;

create or replace function public.touch_updated_at() returns trigger language plpgsql set search_path = public
as $$ begin new.updated_at = now(); return new; end $$;
create trigger reviews_touch before update on public.reviews for each row execute function public.touch_updated_at();

create or replace function public.review_summary(_service_slug text default null)
returns table (average numeric, total bigint, five bigint, four bigint, three bigint, two bigint, one bigint)
language sql stable security definer set search_path = public
as $$
  select coalesce(round(avg(rating)::numeric, 1), 0), count(*),
    count(*) filter (where rating = 5), count(*) filter (where rating = 4),
    count(*) filter (where rating = 3), count(*) filter (where rating = 2),
    count(*) filter (where rating = 1)
  from public.reviews
  where status = 'approved' and (_service_slug is null or service_slug = _service_slug)
$$;
grant execute on function public.review_summary(text) to anon, authenticated;

alter publication supabase_realtime add table public.reviews;