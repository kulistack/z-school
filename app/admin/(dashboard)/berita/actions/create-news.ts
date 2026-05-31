"use server";

import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";
import { redirect } from "next/navigation";

export async function createNews(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const isPublished = formData.get("is_published") === "on";

  if (!title) {
    redirect("/admin/berita/create?error=Judul berita wajib diisi");
  }

  if (!content) {
    redirect("/admin/berita/create?error=Konten berita wajib diisi");
  }

  const supabase = await createClient();

  const baseSlug = slugify(title);
  const slug = `${baseSlug}-${Date.now()}`;

  const { error } = await supabase.from("news").insert({
    title,
    slug,
    excerpt: excerpt || null,
    content,
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  });

  if (error) {
    redirect(`/admin/berita/create?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/berita?success=Berita berhasil ditambahkan");
}