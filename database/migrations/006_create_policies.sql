-- =====================================================
-- Migration: 006_create_policies
-- Description: Create base RLS policies for public and admin access.
-- =====================================================

-- =====================================================
-- SITE SETTINGS POLICIES
-- =====================================================

drop policy if exists "Public can read site settings"
on public.site_settings;

create policy "Public can read site settings"
on public.site_settings
for select
to anon, authenticated
using (true);


drop policy if exists "Authenticated users can manage site settings"
on public.site_settings;

create policy "Authenticated users can manage site settings"
on public.site_settings
for all
to authenticated
using (true)
with check (true);


-- =====================================================
-- NEWS POLICIES
-- =====================================================

drop policy if exists "Public can read published news"
on public.news;

create policy "Public can read published news"
on public.news
for select
to anon, authenticated
using (is_published = true);


drop policy if exists "Authenticated users can manage news"
on public.news;

create policy "Authenticated users can manage news"
on public.news
for all
to authenticated
using (true)
with check (true);


-- =====================================================
-- GRADUATION STUDENTS POLICIES
-- =====================================================

drop policy if exists "Authenticated users can manage graduation students"
on public.graduation_students;

create policy "Authenticated users can manage graduation students"
on public.graduation_students
for all
to authenticated
using (true)
with check (true);