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

-- ---------------- SITE SETTINGS (profil sozlamalari) ----------------
create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default 'Javohir Turayev',
  role text default 'Front-end Developer',
  avatar_url text default '/assets/img/avatar.png',
  phone text default '+998 97 070 17 02',
  telegram text default 'https://t.me/turayevdev',
  instagram text default 'https://instagram.com/__turayevvv1',
  github text default 'https://github.com/turayevdev',
  updated_at timestamptz default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "site_settings_select_public" on public.site_settings;

create policy "site_settings_select_public" on public.site_settings
  for select using (true);

drop policy if exists "site_settings_write_auth" on public.site_settings;

create policy "site_settings_write_auth" on public.site_settings
  for all to authenticated using (true) with check (true);

insert into public.site_settings (id, full_name, role, avatar_url, phone, telegram, instagram, github)
values (
  '00000000-0000-0000-0000-000000000001',
  'Javohir Turayev',
  'Front-end Developer',
  '/assets/img/avatar.png',
  '+998 97 070 17 02',
  'https://t.me/turayevdev',
  'https://instagram.com/__turayevvv1',
  'https://github.com/turayevdev'
)
on conflict (id) do nothing;

-- ---------------- INITIAL DATA SEED (Boshlang'ich real ma'lumotlar) ----------------
insert into public.skills (name, file, ext, order_index)
values 
  ('HTML5', 'html', 'svg', 1),
  ('CSS3', 'css', 'svg', 2),
  ('Sass/SCSS', 'sass', 'svg', 3),
  ('JavaScript', 'javascript', 'svg', 4),
  ('Git', 'git', 'svg', 5),
  ('GitHub', 'github', 'svg', 6)
on conflict do nothing;

insert into public.experiences (title, company, date, logo, order_index)
values (
  'Front-end Developer',
  'Freelance & Loyihalar',
  '2023 - Hozirgacha',
  '/assets/img/avatar.png',
  1
)
on conflict do nothing;

insert into public.projects (title, subtitle, image, site_link, order_index)
values (
  'Shaxsiy Portfolio Veb-sayt',
  'Next.js 16, TypeScript, Tailwind CSS va Supabase yordamida yaratilgan zamonaviy portfolio',
  '/assets/img/avatar.png',
  'https://github.com/Javohir-dev-code/Partfolio',
  1
)
on conflict do nothing;

insert into public.certificates (title, issuer, date, image, order_index)
values (
  'Frontend Development Sertifikati',
  'Dasturlash Kursi',
  '2024',
  '/assets/img/certificates/owa-cer.png',
  1
)
on conflict do nothing;

insert into public.blogs (title, slug, tag, read_time, date, image, content, order_index)
values (
  'Frontend dasturlashda zamonaviy texnologiyalar',
  'frontend-zamonaviy-texnologiyalar',
  'Frontend',
  '5 min',
  '2024',
  '/assets/img/blog/aaa.png',
  'HTML5, CSS3, Sass/SCSS va JavaScript yordamida tezkor, chiroyli va qulay veb-saytlar yaratish usullari.',
  1
)
on conflict do nothing;