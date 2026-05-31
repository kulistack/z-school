import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { updateNews } from "../../actions/update-news";

type EditNewsPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditNewsPage({
  params,
  searchParams,
}: EditNewsPageProps) {
  const { id } = await params;
  const { error } = await searchParams;

  const supabase = await createClient();

  const { data: news } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!news) {
    notFound();
  }

  return (
    <main className="p-6">
      <div className="max-w-4xl">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
          Admin
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-950">Edit Berita</h1>

        <p className="mt-2 text-gray-600">
          Perbarui isi berita atau ubah status publish.
        </p>

        {error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form
          action={updateNews}
          className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6"
        >
          <input type="hidden" name="id" value={news.id} />
          <input type="hidden" name="old_slug" value={news.slug} />
          <input
            type="hidden"
            name="was_published"
            value={String(news.is_published)}
          />

          <div>
            <label className="text-sm font-medium text-gray-800">Judul</label>
            <input
              name="title"
              type="text"
              defaultValue={news.title || ""}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800">
              Ringkasan
            </label>
            <textarea
              name="excerpt"
              rows={3}
              defaultValue={news.excerpt || ""}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800">Konten</label>
            <textarea
              name="content"
              rows={10}
              defaultValue={news.content || ""}
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm leading-7 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>

          <label className="flex items-center gap-3 rounded-xl border border-gray-200 p-4">
            <input
              name="is_published"
              type="checkbox"
              defaultChecked={news.is_published}
              className="h-4 w-4 accent-[var(--primary)]"
            />
            <span className="text-sm font-medium text-gray-800">
              Publish berita
            </span>
          </label>

          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <Link
              href="/admin/berita"
              className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </Link>

            <button
              type="submit"
              className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-medium text-[var(--primary-foreground)] transition hover:opacity-90"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}