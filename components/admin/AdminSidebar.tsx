"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminMenus = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Setting Website",
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

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav className="mt-8 space-y-2">
      {adminMenus.map((menu) => {
        const isActive =
          pathname === menu.href || pathname.startsWith(`${menu.href}/`);

        return (
          <Link
            key={menu.href}
            href={menu.href}
            className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[var(--secondary)] text-[var(--primary)]"
                : "text-gray-700 hover:bg-[var(--secondary)] hover:text-[var(--primary)]"
            }`}
          >
            {menu.label}
          </Link>
        );
      })}
    </nav>
  );
}