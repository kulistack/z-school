-- =====================================================
-- Migration: 008_create_site_assets_bucket
-- Description:
-- Create Supabase Storage bucket and policies for site assets
-- such as school logo and banner.
-- =====================================================

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'site-assets',
  'site-assets',
  true,
  5242880,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Public can view site assets'
  ) then
    create policy "Public can view site assets"
    on storage.objects
    for select
    using (
      bucket_id = 'site-assets'
    );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can upload site assets'
  ) then
    create policy "Authenticated users can upload site assets"
    on storage.objects
    for insert
    to authenticated
    with check (
      bucket_id = 'site-assets'
    );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can update site assets'
  ) then
    create policy "Authenticated users can update site assets"
    on storage.objects
    for update
    to authenticated
    using (
      bucket_id = 'site-assets'
    )
    with check (
      bucket_id = 'site-assets'
    );
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Authenticated users can delete site assets'
  ) then
    create policy "Authenticated users can delete site assets"
    on storage.objects
    for delete
    to authenticated
    using (
      bucket_id = 'site-assets'
    );
  end if;
end $$;