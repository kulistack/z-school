import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data: setting, error: settingError } = await supabase
    .from("site_settings")
    .select("school_name, school_level, graduation_announcement_enabled")
    .limit(1)
    .maybeSingle();

  const { count: newsCount } = await supabase
    .from("news")
    .select("*", { count: "exact", head: true });

  const { count: graduationStudentCount } = await supabase
    .from("graduation_students")
    .select("*", { count: "exact", head: true });

  return (
    <main className="p-6">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
        Admin
      </p>

      <h1 className="mt-2 text-2xl font-bold text-gray-950">
        Dashboard Admin
      </h1>

      <p className="mt-2 text-gray-600">
        Ringkasan data website, berita, dan kelulusan.
      </p>

      {settingError ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Gagal mengambil data setting: {settingError.message}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Nama Sekolah</p>
          <p className="mt-2 text-xl font-semibold text-gray-950">
            {setting?.school_name || "-"}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Jenjang Sekolah</p>
          <p className="mt-2 text-xl font-semibold uppercase text-gray-950">
            {setting?.school_level || "-"}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Berita</p>
          <p className="mt-2 text-xl font-semibold text-gray-950">
            {newsCount ?? 0}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Data Kelulusan</p>
          <p className="mt-2 text-xl font-semibold text-gray-950">
            {graduationStudentCount ?? 0}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-500">Status Pengumuman Kelulusan</p>
        <p className="mt-2 text-xl font-semibold text-gray-950">
          {setting?.graduation_announcement_enabled
            ? "Aktif"
            : "Belum Aktif"}
        </p>

        <p className="mt-2 text-sm text-gray-600">
          Status ini bisa diubah dari halaman Setting Website.
        </p>
      </div>
    </main>
  );
}