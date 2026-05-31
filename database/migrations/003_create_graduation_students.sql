-- =====================================================
-- Migration: 003_create_graduation_students
-- Description: Create table for student graduation data.
-- =====================================================

create table if not exists public.graduation_students (
  id uuid primary key default gen_random_uuid(),

  nis text,
  nisn text,
  student_name text not null,
  class_name text,
  major text,

  status text not null check (status in ('LULUS', 'TIDAK_LULUS')),
  note text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint graduation_students_identifier_required
    check (
      nullif(trim(coalesce(nis, '')), '') is not null
      or nullif(trim(coalesce(nisn, '')), '') is not null
    )
);

create index if not exists idx_graduation_students_nis
on public.graduation_students (nis);

create index if not exists idx_graduation_students_nisn
on public.graduation_students (nisn);

create index if not exists idx_graduation_students_status
on public.graduation_students (status);