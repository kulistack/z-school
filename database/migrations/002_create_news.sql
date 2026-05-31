-- =====================================================
-- Migration: 002_create_news
-- Description: Create table for school news/articles.
-- =====================================================

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),

  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  cover_image_url text,

  is_published boolean not null default false,
  published_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_news_slug
on public.news (slug);

create index if not exists idx_news_is_published
on public.news (is_published);

create index if not exists idx_news_published_at
on public.news (published_at desc);