import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { deleteNews } from "./actions/delete-news";
import { ConfirmDeleteButton } from "@/components/admin/ConfirmDeleteButton";

type AdminBeritaPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

export default async function AdminBeritaPage({
  searchParams,
}: AdminBeritaPageProps) {
  const { success, error } = await searchParams;

  const supabase = await createClient();

  const { data: news, error: newsError } = await supabase
    .from("news")
    .select("id, title, slug, is_published, published_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <main className="p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
            Admin
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-950">
            Manajemen Berita
          </h1>
          <p className="mt-2 text-gray-600">
            Tambah, edit, publish, dan hapus berita sekolah.
          </p>
        </div>

        <Link
          href="/admin/berita/create"
          className="rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-medium text-[var(--primary-foreground)] transition hover:opacity-90"
        >
          Tambah Berita
        </Link>
      </div>

      {success ? (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {success}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {newsError ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Gagal mengambil berita: {newsError.message}
        </div>
      ) : null}

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-5 py-4 font-medium">Judul</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Slug</th>
                <th className="px-5 py-4 font-medium">Tanggal</th>
                <th className="px-5 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {news?.length ? (
                news.map((item) => (
                  <tr key={item.id}>
                    <td className="px-5 py-4 font-medium text-gray-950">
                      {item.title}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.is_published
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{item.slug}</td>
                    <td className="px-5 py-4 text-gray-600">
                      {new Date(item.created_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/berita/${item.slug}`}
                          target="_blank"
                          className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Lihat
                        </Link>

                        <Link
                          href={`/admin/berita/${item.id}/edit`}
                          className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Edit
                        </Link>

                        <form action={deleteNews}>
                          <input type="hidden" name="id" value={item.id} />
                          <ConfirmDeleteButton message="Yakin ingin menghapus berita ini?" />
                        </form>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    Belum ada berita.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}