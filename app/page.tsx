export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500">
          Z-School
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-950 md:text-6xl">
          Website profil sekolah dan cek kelulusan siswa.
        </h1>

        <p className="max-w-2xl text-lg leading-8 text-gray-600">
          Platform sederhana untuk menampilkan profil sekolah, berita terbaru,
          dan pengumuman kelulusan berbasis NIS atau NISN.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/profil"
            className="rounded-xl bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Lihat Profil
          </a>
          <a
            href="/cek-kelulusan"
            className="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium transition hover:bg-gray-50"
          >
            Cek Kelulusan
          </a>
        </div>
      </section>
    </main>
  );
}