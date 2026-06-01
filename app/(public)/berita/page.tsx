import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function BeritaPage() {
  const supabase = await createClient();

  const { data: news } = await supabase
    .from("news")
    .select("id, title, slug, excerpt, cover_image_url, published_at, created_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
        Berita
      </p>

      <h1 className="mt-2 text-3xl font-bold text-gray-950">Berita Sekolah</h1>

      <p className="mt-4 max-w-2xl leading-7 text-gray-600">
        Informasi, pengumuman, dan berita terbaru dari sekolah.
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {news?.length ? (
          news.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:border-[var(--primary)]"
            >
              {item.cover_image_url ? (
                <img
                  src={item.cover_image_url}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
              ) : (
                <div className="flex h-48 w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                  Tidak ada thumbnail
                </div>
              )}

              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--primary)]">
                  {new Date(
                    item.published_at || item.created_at
                  ).toLocaleDateString("id-ID")}
                </p>

                <h2 className="mt-3 text-lg font-semibold text-gray-950">
                  {item.title}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">
                  {item.excerpt || "Baca selengkapnya tentang berita ini."}
                </p>

                <Link
                  href={`/berita/${item.slug}`}
                  className="mt-5 inline-block text-sm font-medium text-[var(--primary)]"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-2xl border border-gray-200 p-6 text-gray-500 md:col-span-3">
            Belum ada berita yang dipublish.
          </div>
        )}
      </div>
    </main>
  );
}