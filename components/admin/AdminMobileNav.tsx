"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminMenus = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Setting",
    href: "/admin/setting",
  },
  {
    label: "Berita",
    href: "/admin/berita",
  },
  {
    label: "Kelulusan",
    href: "/admin/kelulusan",
  },
];

export function AdminMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-4 flex gap-2 overflow-x-auto">
      {adminMenus.map((menu) => {
        const isActive =
          pathname === menu.href || pathname.startsWith(`${menu.href}/`);

        return (
          <Link
            key={menu.href}
            href={menu.href}
            className={`whitespace-nowrap rounded-xl border px-3 py-2 text-sm font-medium ${
              isActive
                ? "border-[var(--primary)] bg-[var(--secondary)] text-[var(--primary)]"
                : "border-gray-200 text-gray-700"
            }`}
          >
            {menu.label}
          </Link>
        );
      })}
    </nav>
  );
}