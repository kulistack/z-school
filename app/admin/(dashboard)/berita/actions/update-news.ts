"use server";

import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";
import { redirect } from "next/navigation";

export async function updateNews(formData: FormData) {
  const id = String(formData.get("id") || "");
  const oldSlug = String(formData.get("old_slug") || "");
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const isPublished = formData.get("is_published") === "on";
  const wasPublished = formData.get("was_published") === "true";

  if (!id) {
    redirect("/admin/berita?error=Data berita tidak ditemukan");
  }

  if (!title) {
    redirect(`/admin/berita/${id}/edit?error=Judul berita wajib diisi`);
  }

  if (!content) {
    redirect(`/admin/berita/${id}/edit?error=Konten berita wajib diisi`);
  }

  const supabase = await createClient();

  const nextSlug = oldSlug || `${slugify(title)}-${Date.now()}`;

  const { error } = await supabase
    .from("news")
    .update({
      title,
      slug: nextSlug,
      excerpt: excerpt || null,
      content,
      is_published: isPublished,
      published_at: isPublished && !wasPublished ? new Date().toISOString() : undefined,
    })
    .eq("id", id);

  if (error) {
    redirect(
      `/admin/berita/${id}/edit?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect("/admin/berita?success=Berita berhasil diperbarui");
}