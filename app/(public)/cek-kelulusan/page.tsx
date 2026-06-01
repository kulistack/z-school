import { createClient } from "@/lib/supabase/server";
import { GraduationCheckForm } from "@/components/public/GraduationCheckForm";

export default async function CekKelulusanPage() {
  const supabase = await createClient();

  const { data: setting } = await supabase
    .from("site_settings")
    .select(
      "school_name, graduation_announcement_enabled, graduation_message, logo_url"
    )
    .limit(1)
    .maybeSingle();

  return (
    <main className="relative overflow-hidden bg-[var(--secondary)] px-4 py-12">
      {/* Logo besar di background merah / pink halaman */}
      {setting?.logo_url ? (
        <img
          src={setting.logo_url}
          alt={`Logo ${setting.school_name || "sekolah"}`}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.04]"
        />
      ) : null}

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="relative overflow-hidden rounded-3xl bg-white p-6 shadow-sm md:p-8">
          {/* Logo watermark di card putih utama */}
          {setting?.logo_url ? (
            <img
              src={setting.logo_url}
              alt={`Logo ${setting.school_name || "sekolah"}`}
              className="pointer-events-none absolute right-6 top-6 h-32 w-32 object-contain opacity-[0.055]"
            />
          ) : null}

          <div className="relative z-10">
            <p className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
              {setting?.school_name || "Z-School"}
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-950">
              Cek Kelulusan Siswa
            </h1>

            <p className="mt-4 leading-7 text-gray-600">
              Masukkan NIS atau NISN untuk mengecek status kelulusan siswa.
            </p>

            {!setting?.graduation_announcement_enabled ? (
              <div className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-5 text-sm leading-6 text-yellow-800">
                {setting?.graduation_message ||
                  "Pengumuman kelulusan belum dibuka."}
              </div>
            ) : (
              <GraduationCheckForm />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}