-- =====================================================
-- Migration: 007_add_school_level_to_site_settings
-- Description: Add school level field for theme selection.
-- =====================================================

alter table public.site_settings
add column if not exists school_level text not null default 'sd'
check (school_level in ('sd', 'smp', 'sma'));