import { createClient } from "@/lib/supabase/server";

export default async function ProfilPage() {
  const supabase = await createClient();

  const { data: setting } = await supabase
    .from("site_settings")
    .select(
      "school_name, school_npsn, headmaster_name, address, phone, email, website, about, history, vision, mission, accreditation"
    )
    .limit(1)
    .maybeSingle();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-[var(--primary)]">
        Profil
      </p>

      <h1 className="mt-2 text-3xl font-bold text-gray-950">
        {setting?.school_name || "Profil Sekolah"}
      </h1>

      <p className="mt-4 max-w-3xl leading-7 text-gray-600">
        {setting?.about ||
          "Halaman ini akan menampilkan informasi sekolah, sejarah, visi, misi, alamat, kontak, dan identitas resmi sekolah."}
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-950">
            Identitas Sekolah
          </h2>

          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-gray-500">NPSN</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {setting?.school_npsn || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Kepala Sekolah</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {setting?.headmaster_name || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Akreditasi</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {setting?.accreditation || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Alamat</dt>
              <dd className="mt-1 font-medium leading-6 text-gray-950">
                {setting?.address || "-"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-950">Kontak</h2>

          <dl className="mt-5 space-y-4 text-sm">
            <div>
              <dt className="text-gray-500">Telepon</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {setting?.phone || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {setting?.email || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Website</dt>
              <dd className="mt-1 font-medium text-gray-950">
                {setting?.website || "-"}
              </dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <section className="rounded-2xl border border-gray-200 p-6 md:col-span-1">
          <h2 className="text-lg font-semibold text-gray-950">Visi</h2>
          <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
            {setting?.vision || "-"}
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 p-6 md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-950">Misi</h2>
          <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
            {setting?.mission || "-"}
          </p>
        </section>
      </div>

      <section className="mt-5 rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-950">Sejarah</h2>
        <p className="mt-4 whitespace-pre-line leading-7 text-gray-600">
          {setting?.history || "-"}
        </p>
      </section>
    </main>
  );
}