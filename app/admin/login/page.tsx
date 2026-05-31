export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Admin Panel
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-950">
          Login Admin
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Masuk untuk mengelola profil sekolah, berita, dan data kelulusan.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-800">Email</label>
            <input
              type="email"
              placeholder="admin@sekolah.sch.id"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-950"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-950"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-gray-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}