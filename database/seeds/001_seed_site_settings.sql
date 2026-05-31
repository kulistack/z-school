-- =====================================================
-- Seed: 001_seed_site_settings
-- Description: Insert default website settings.
-- =====================================================

insert into public.site_settings (
  school_name,
  about,
  graduation_announcement_enabled,
  graduation_message
)
select
  'Z-School Demo',
  'Website profil sekolah dan cek kelulusan siswa.',
  false,
  'Pengumuman kelulusan belum dibuka.'
where not exists (
  select 1 from public.site_settings
);