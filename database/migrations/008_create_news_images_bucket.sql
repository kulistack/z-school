-- =====================================================
-- Migration: 008_create_news_images_bucket
-- Description:
-- Create Supabase Storage bucket and policies for news thumbnails.
-- =====================================================

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'news-images',
  'news-images',
  true,
  5242880,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Allow public read access to news images
create policy "Public can view news images"
on storage.objects
for select
using (
  bucket_id = 'news-images'
);

-- Allow authenticated users to upload news images
create policy "Authenticated users can upload news images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'news-images'
);

-- Allow authenticated users to update news images
create policy "Authenticated users can update news images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'news-images'
)
with check (
  bucket_id = 'news-images'
);

-- Allow authenticated users to delete news images
create policy "Authenticated users can delete news images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'news-images'
);