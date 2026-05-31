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
      <p className="text-sm text-gray-500">Slug: {slug}</p>
      <h1 className="mt-2 text-3xl font-bold">Detail Berita</h1>
      <p className="mt-4 text-gray-600">
        Halaman ini akan menampilkan detail berita berdasarkan slug.
      </p>
    </main>
  );
}