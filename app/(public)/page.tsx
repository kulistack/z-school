import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: setting } = await supabase
    .from("site_settings")
    .select(
      "school_name, school_level, about, accreditation, headmaster_name, address"
    )
    .limit(1)
    .maybeSingle();

  const { data: latestNews } = await supabase
    .from("news")
    .select("id, title, slug, excerpt, published_at, created_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3);

  return (
    <main>
      <section className="bg-[var(--secondary)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
              {setting?.school_level || "school"}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">
              {setting?.school_name || "Z-School"}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-700">
              {setting?.about ||
                "Website profil sekolah, berita, dan pengumuman kelulusan siswa berbasis NIS atau NISN."}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/profil"
                className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-medium text-[var(--primary-foreground)] transition hover:opacity-90"
              >
                Lihat Profil Sekolah
              </Link>

              <Link
                href="/cek-kelulusan"
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                Cek Kelulusan
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/70 bg-white p-6 shadow-sm">
            <div className="rounded-2xl bg-[var(--primary)] p-6 text-[var(--primary-foreground)]">
              <p className="text-sm font-medium uppercase tracking-wide opacity-80">
                Informasi Sekolah
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Selamat Datang di Website Resmi Sekolah
              </h2>

              <p className="mt-4 text-sm leading-6 opacity-90">
                Akses informasi sekolah, berita terbaru, dan layanan cek
                kelulusan dalam satu website sederhana.
              </p>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Akreditasi</p>
                <p className="mt-1 font-semibold text-gray-950">
                  {setting?.accreditation || "-"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Kepala Sekolah</p>
                <p className="mt-1 font-semibold text-gray-950">
                  {setting?.headmaster_name || "-"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4">
                <p className="text-sm text-gray-500">Alamat</p>
                <p className="mt-1 text-sm leading-6 text-gray-950">
                  {setting?.address || "-"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
              Berita Terbaru
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-950">
              Informasi Sekolah
            </h2>
          </div>

          <Link
            href="/berita"
            className="text-sm font-medium text-[var(--primary)]"
          >
            Lihat Semua Berita →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {latestNews?.length ? (
            latestNews.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-gray-200 p-6 transition hover:border-[var(--primary)]"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--primary)]">
                  {new Date(
                    item.published_at || item.created_at
                  ).toLocaleDateString("id-ID")}
                </p>

                <h3 className="mt-3 text-lg font-semibold text-gray-950">
                  {item.title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {item.excerpt || "Baca selengkapnya tentang berita ini."}
                </p>

                <Link
                  href={`/berita/${item.slug}`}
                  className="mt-5 inline-block text-sm font-medium text-[var(--primary)]"
                >
                  Baca Selengkapnya
                </Link>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-gray-200 p-6 text-gray-500 md:col-span-3">
              Belum ada berita yang dipublish.
            </div>
          )}
        </div>
      </section>

      <section className="bg-gray-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-14 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-[var(--primary)]">01</p>
            <h3 className="mt-3 font-semibold text-gray-950">
              Profil Sekolah
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Tampilkan identitas, sejarah, visi, misi, dan kontak sekolah.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-[var(--primary)]">02</p>
            <h3 className="mt-3 font-semibold text-gray-950">
              Berita Sekolah
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Publikasikan informasi dan pengumuman terbaru kepada publik.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-3xl font-bold text-[var(--primary)]">03</p>
            <h3 className="mt-3 font-semibold text-gray-950">
              Cek Kelulusan
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Siswa cukup memasukkan NIS atau NISN untuk melihat hasil.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}