export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Z-School
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Website profil sekolah dan cek kelulusan siswa.
        </h1>

        <p className="max-w-2xl text-lg text-gray-600">
          Platform sederhana untuk menampilkan profil sekolah, berita terbaru,
          dan pengumuman kelulusan berbasis NIS atau NISN.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="/profil"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Lihat Profil
          </a>
          <a
            href="/cek-kelulusan"
            className="rounded-xl border px-5 py-3 text-sm font-medium"
          >
            Cek Kelulusan
          </a>
        </div>
      </section>
    </main>
  );
}