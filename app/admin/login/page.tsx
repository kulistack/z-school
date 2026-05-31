export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border p-6">
        <h1 className="text-2xl font-bold">Login Admin</h1>
        <p className="mt-2 text-sm text-gray-600">
          Masuk untuk mengelola website sekolah.
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}