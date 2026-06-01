import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

type BeritaDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BeritaDetailPage({
  params,
}: BeritaDetailPageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: news } = await supabase
    .from("news")
    .select("title, excerpt, content, cover_image_url, published_at, created_at")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!news) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/berita"
        className="text-sm font-medium text-[var(--primary)]"
      >
        ← Kembali ke Berita
      </Link>

      <p className="mt-8 text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
        Berita Sekolah
      </p>

      <h1 className="mt-3 text-3xl font-bold leading-tight text-gray-950 md:text-4xl">
        {news.title}
      </h1>

      <p className="mt-4 text-sm text-gray-500">
        Dipublikasikan pada{" "}
        {new Date(news.published_at || news.created_at).toLocaleDateString(
          "id-ID"
        )}
      </p>

      {news.cover_image_url ? (
        <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
          <img
            src={news.cover_image_url}
            alt={news.title}
            className="max-h-[420px] w-full object-cover"
          />
        </div>
      ) : null}

      {news.excerpt ? (
        <p className="mt-6 rounded-2xl bg-[var(--secondary)] p-5 text-lg leading-8 text-[var(--secondary-foreground)]">
          {news.excerpt}
        </p>
      ) : null}

      <article className="mt-8 whitespace-pre-line text-base leading-8 text-gray-700">
        {news.content}
      </article>
    </main>
  );
}