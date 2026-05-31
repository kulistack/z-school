-- =====================================================
-- Migration: 004_create_updated_at_trigger
-- Description: Automatically update updated_at column.
-- =====================================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_site_settings_updated_at on public.site_settings;

create trigger set_site_settings_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

drop trigger if exists set_news_updated_at on public.news;

create trigger set_news_updated_at
before update on public.news
for each row
execute function public.set_updated_at();

drop trigger if exists set_graduation_students_updated_at on public.graduation_students;

create trigger set_graduation_students_updated_at
before update on public.graduation_students
for each row
execute function public.set_updated_at();