import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export async function PublicFooter() {
  const supabase = await createClient();

  const { data: setting } = await supabase
    .from("site_settings")
    .select("school_name, address, phone, email, website, logo_url")
    .limit(1)
    .maybeSingle();

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white">
              {setting?.logo_url ? (
                <img
                  src={setting.logo_url}
                  alt={`Logo ${setting.school_name || "sekolah"}`}
                  className="h-full w-full object-contain p-1.5"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-[var(--primary)] text-sm font-bold uppercase text-[var(--primary-foreground)]">
                  Z
                </span>
              )}
            </div>

            <p className="text-lg font-bold text-gray-950">
              {setting?.school_name || "Z-School"}
            </p>
          </div>
          <p className="mt-3 text-sm leading-6 text-gray-600">
            Website profil sekolah, berita, dan layanan cek kelulusan siswa.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-950">Menu</p>
          <div className="mt-3 grid gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-600 hover:text-[var(--primary)]"
            >
              Beranda
            </Link>
            <Link
              href="/profil"
              className="text-gray-600 hover:text-[var(--primary)]"
            >
              Profil Sekolah
            </Link>
            <Link
              href="/berita"
              className="text-gray-600 hover:text-[var(--primary)]"
            >
              Berita
            </Link>
            <Link
              href="/cek-kelulusan"
              className="text-gray-600 hover:text-[var(--primary)]"
            >
              Cek Kelulusan
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-950">Kontak</p>
          <div className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
            <p>{setting?.address || "Alamat sekolah belum diatur."}</p>
            <p>{setting?.phone || "-"}</p>
            <p>{setting?.email || "-"}</p>
            <p>{setting?.website || "-"}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-5">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} {setting?.school_name || "Z-School"}.
            All rights reserved.
          </p>
          <p>Powered by Ryo Kurniawan.</p>
        </div>
      </div>
    </footer>
  );
}
