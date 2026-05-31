import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

const menus = [
  {
    label: "Beranda",
    href: "/",
  },
  {
    label: "Profil",
    href: "/profil",
  },
  {
    label: "Berita",
    href: "/berita",
  },
  {
    label: "Cek Kelulusan",
    href: "/cek-kelulusan",
  },
];

export async function PublicNavbar() {
  const supabase = await createClient();

  const { data: setting } = await supabase
    .from("site_settings")
    .select("school_name, school_level")
    .limit(1)
    .maybeSingle();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary)] text-sm font-bold uppercase text-[var(--primary-foreground)]">
            Z
          </div>

          <div>
            <p className="text-sm font-bold leading-5 text-gray-950">
              {setting?.school_name || "Z-School"}
            </p>
            <p className="text-xs uppercase tracking-wide text-gray-500">
              {setting?.school_level || "school"}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="rounded-xl px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
            >
              {menu.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/admin/login"
          className="hidden rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-[var(--primary)] hover:bg-[var(--secondary)] hover:text-[var(--primary)] md:inline-flex"
        >
          Admin
        </Link>
      </div>

      <div className="border-t border-gray-100 px-4 pb-3 md:hidden">
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto pt-3">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="whitespace-nowrap rounded-xl border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700"
            >
              {menu.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}