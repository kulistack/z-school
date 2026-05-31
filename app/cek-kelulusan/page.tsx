export default function CekKelulusanPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-4 py-12">
      <div>
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Kelulusan
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-950">
          Cek Kelulusan Siswa
        </h1>

        <p className="mt-4 leading-7 text-gray-600">
          Masukkan NIS atau NISN untuk mengecek status kelulusan siswa.
        </p>

        <form className="mt-8 space-y-4 rounded-2xl border border-gray-200 p-5">
          <div>
            <label className="text-sm font-medium text-gray-800">
              NIS / NISN
            </label>
            <input
              type="text"
              placeholder="Contoh: 1234567890"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-950"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Cek Sekarang
          </button>
        </form>
      </div>
    </main>
  );
}