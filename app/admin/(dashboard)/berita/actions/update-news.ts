"use server";

import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";
import { redirect } from "next/navigation";

const NEWS_IMAGES_BUCKET = "news-images";
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function getFileExtension(filename: string) {
  return filename.split(".").pop()?.toLowerCase() || "jpg";
}

function isValidImage(file: File) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  return allowedTypes.includes(file.type) && file.size <= MAX_IMAGE_SIZE;
}

export async function updateNews(formData: FormData) {
  const id = String(formData.get("id") || "");
  const oldSlug = String(formData.get("old_slug") || "");
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const isPublished = formData.get("is_published") === "on";
  const wasPublished = formData.get("was_published") === "true";
  const coverImage = formData.get("cover_image");

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

  const updatePayload: {
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    is_published: boolean;
    published_at?: string;
    cover_image_url?: string | null;
  } = {
    title,
    slug: nextSlug,
    excerpt: excerpt || null,
    content,
    is_published: isPublished,
  };

  if (isPublished && !wasPublished) {
    updatePayload.published_at = new Date().toISOString();
  }

  if (coverImage instanceof File && coverImage.size > 0) {
    if (!isValidImage(coverImage)) {
      redirect(
        `/admin/berita/${id}/edit?error=Thumbnail harus berupa JPG, PNG, WebP, atau GIF dengan ukuran maksimal 5MB`
      );
    }

    const extension = getFileExtension(coverImage.name);
    const filePath = `${nextSlug}/cover-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(NEWS_IMAGES_BUCKET)
      .upload(filePath, coverImage, {
        cacheControl: "3600",
        upsert: false,
        contentType: coverImage.type,
      });

    if (uploadError) {
      redirect(
        `/admin/berita/${id}/edit?error=${encodeURIComponent(
          uploadError.message
        )}`
      );
    }

    const { data } = supabase.storage
      .from(NEWS_IMAGES_BUCKET)
      .getPublicUrl(filePath);

    updatePayload.cover_image_url = data.publicUrl;
  }

  const { error } = await supabase
    .from("news")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    redirect(
      `/admin/berita/${id}/edit?error=${encodeURIComponent(error.message)}`
    );
  }

  redirect("/admin/berita?success=Berita berhasil diperbarui");
}