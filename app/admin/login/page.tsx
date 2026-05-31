import { loginAdmin } from "./actions/login";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--secondary)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--secondary-foreground)]">
          Admin Panel
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-950">Login Admin</h1>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Masuk untuk mengelola profil sekolah, berita, dan data kelulusan.
        </p>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <form action={loginAdmin} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-800">Email</label>
            <input
              name="email"
              type="email"
              placeholder="admin@sekolah.sch.id"
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Masukkan password"
              className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-medium text-[var(--primary-foreground)] transition hover:opacity-90"
          >
            Masuk
          </button>
        </form>
      </div>
    </main>
  );
}