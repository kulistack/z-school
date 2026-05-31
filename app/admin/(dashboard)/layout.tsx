import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { logoutAdmin } from "./actions/logout";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-gray-200 bg-white p-5 md:block">
        <Link href="/admin/dashboard" className="block">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">
            Z-School
          </p>
          <h1 className="mt-2 text-xl font-bold text-gray-950">Admin Panel</h1>
        </Link>

        <AdminSidebar />

        <form action={logoutAdmin} className="absolute bottom-5 left-5 right-5">
          <button
            type="submit"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[var(--primary)] hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
          >
            Logout
          </button>
        </form>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-4 py-4 md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/admin/dashboard" className="font-bold text-[var(--primary)]">
              Z-School Admin
            </Link>

            <form action={logoutAdmin}>
              <button className="text-sm font-medium text-gray-700">
                Logout
              </button>
            </form>
          </div>

          <AdminMobileNav />
        </header>

        {children}
      </div>
    </div>
  );
}