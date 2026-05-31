-- =====================================================
-- Migration: 005_enable_rls
-- Description: Enable Row Level Security for public tables.
-- =====================================================

alter table public.site_settings enable row level security;
alter table public.news enable row level security;
alter table public.graduation_students enable row level security;