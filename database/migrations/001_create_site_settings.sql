-- =====================================================
-- Migration: 001_create_site_settings
-- Description: Create table for school website settings.
-- =====================================================

create extension if not exists "pgcrypto";

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),

  school_name text not null default 'Nama Sekolah',
  school_npsn text,
  headmaster_name text,
  address text,
  phone text,
  email text,
  website text,

  logo_url text,
  banner_url text,

  about text,
  history text,
  vision text,
  mission text,
  accreditation text,

  graduation_announcement_enabled boolean not null default false,
  graduation_message text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);