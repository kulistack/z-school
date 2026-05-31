export default function CekKelulusanPage() {
  return (
    <main className="mx-auto max-w-xl px-4 py-12">
      <h1 className="text-3xl font-bold">Cek Kelulusan</h1>
      <p className="mt-4 text-gray-600">
        Masukkan NIS atau NISN untuk mengecek status kelulusan.
      </p>

      <form className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium">NIS / NISN</label>
          <input
            type="text"
            placeholder="Contoh: 1234567890"
            className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
        >
          Cek Sekarang
        </button>
      </form>
    </main>
  );
}