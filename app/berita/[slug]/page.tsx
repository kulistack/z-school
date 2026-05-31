type BeritaDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BeritaDetailPage({
  params,
}: BeritaDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
        Detail Berita
      </p>

      <h1 className="mt-2 text-3xl font-bold text-gray-950">
        Detail Berita Sekolah
      </h1>

      <p className="mt-4 text-gray-600">
        Slug berita: <span className="font-medium text-gray-950">{slug}</span>
      </p>
    </main>
  );
}