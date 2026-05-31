import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: setting } = await supabase
    .from("site_settings")
    .select("school_name, about")
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
          {setting?.school_name || "Z-School"}
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">
          Website profil sekolah dan cek kelulusan siswa.
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-gray-600">
          {setting?.about ||
            "Platform sederhana untuk menampilkan profil sekolah, berita terbaru, dan pengumuman kelulusan berbasis NIS atau NISN."}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/profil"
            className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-medium text-[var(--primary-foreground)] transition hover:opacity-90"
          >
            Lihat Profil
          </Link>
          <Link
            href="/cek-kelulusan"
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-800 transition hover:border-[var(--primary)] hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
          >
            Cek Kelulusan
          </Link>
        </div>
      </section>
    </main>
  );
}