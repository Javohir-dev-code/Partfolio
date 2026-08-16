-- =============================================================
--  Portfolio Admin Panel - Supabase Schema
--  Run this in Supabase SQL Editor (Dashboard -> SQL Editor)
-- =============================================================

create extension if not exists "pgcrypto";

-- ---------------- PROJECTS ----------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  image text,
  image_light text,
  detail_link text,
  site_link text,
  order_index int default 0,
  created_at timestamptz default now()
);

alter table public.projects enable row level security;

drop policy if exists "projects_select_public" on public.projects;

create policy "projects_select_public" on public.projects
  for select using (true);

drop policy if exists "projects_write_auth" on public.projects;

create policy "projects_write_auth" on public.projects
  for all to authenticated using (true) with check (true);

-- ---------------- BLOGS ----------------
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text unique,
  title text not null,
  image text,
  tag text,
  read_time text,
  content text,
  date text,
  published_at timestamptz,
  order_index int default 0,
  created_at timestamptz default now()
);

alter table public.blogs enable row level security;

drop policy if exists "blogs_select_public" on public.blogs;


create policy "blogs_select_public" on public.blogs
  for select using (true);

drop policy if exists "blogs_write_auth" on public.blogs;

create policy "blogs_write_auth" on public.blogs
  for all to authenticated using (true) with check (true);

-- ---------------- SKILLS ----------------
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  file text,
  ext text,
  order_index int default 0,
  created_at timestamptz default now()
);

alter table public.skills enable row level security;

drop policy if exists "skills_select_public" on public.skills;

create policy "skills_select_public" on public.skills
  for select using (true);

drop policy if exists "skills_write_auth" on public.skills;

create policy "skills_write_auth" on public.skills
  for all to authenticated using (true) with check (true);

-- ---------------- EXPERIENCES ----------------
create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  date text,
  title text not null,
  company text not null,
  logo text,
  order_index int default 0,
  created_at timestamptz default now()
);

alter table public.experiences enable row level security;

drop policy if exists "experiences_select_public" on public.experiences;

create policy "experiences_select_public" on public.experiences
  for select using (true);

drop policy if exists "experiences_write_auth" on public.experiences;

create policy "experiences_write_auth" on public.experiences
  for all to authenticated using (true) with check (true);

-- ---------------- CERTIFICATES ----------------
create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  date text,
  image text,
  credential_link text,
  order_index int default 0,
  created_at timestamptz default now()
);

alter table public.certificates enable row level security;

drop policy if exists "certificates_select_public" on public.certificates;

create policy "certificates_select_public" on public.certificates
  for select using (true);

drop policy if exists "certificates_write_auth" on public.certificates;

create policy "certificates_write_auth" on public.certificates
  for all to authenticated using (true) with check (true);

-- ---------------- MESSAGES ----------------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

drop policy if exists "messages_insert_public" on public.messages;

create policy "messages_insert_public" on public.messages
  for insert to anon, authenticated with check (true);

drop policy if exists "messages_select_auth" on public.messages;

create policy "messages_select_auth" on public.messages
  for select to authenticated using (true);

drop policy if exists "messages_update_auth" on public.messages;

create policy "messages_update_auth" on public.messages
  for update to authenticated using (true) with check (true);

drop policy if exists "messages_delete_auth" on public.messages;

create policy "messages_delete_auth" on public.messages
  for delete to authenticated using (true);

-- ---------------- STORAGE: site rasmlari ----------------
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

drop policy if exists "images_public_read" on storage.objects;

create policy "images_public_read" on storage.objects
  for select using (bucket_id = 'site-images');

drop policy if exists "images_auth_write" on storage.objects;

create policy "images_auth_write" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-images');

drop policy if exists "images_auth_update" on storage.objects;

create policy "images_auth_update" on storage.objects
  for update to authenticated using (bucket_id = 'site-images');

drop policy if exists "images_auth_delete" on storage.objects;

create policy "images_auth_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'site-images');