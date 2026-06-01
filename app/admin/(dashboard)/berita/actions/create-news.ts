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

export async function createNews(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const isPublished = formData.get("is_published") === "on";
  const coverImage = formData.get("cover_image");

  if (!title) {
    redirect("/admin/berita/create?error=Judul berita wajib diisi");
  }

  if (!content) {
    redirect("/admin/berita/create?error=Konten berita wajib diisi");
  }

  const supabase = await createClient();

  const baseSlug = slugify(title);
  const slug = `${baseSlug}-${Date.now()}`;

  let coverImageUrl: string | null = null;

  if (coverImage instanceof File && coverImage.size > 0) {
    if (!isValidImage(coverImage)) {
      redirect(
        "/admin/berita/create?error=Thumbnail harus berupa JPG, PNG, WebP, atau GIF dengan ukuran maksimal 5MB"
      );
    }

    const extension = getFileExtension(coverImage.name);
    const filePath = `${slug}/cover-${Date.now()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(NEWS_IMAGES_BUCKET)
      .upload(filePath, coverImage, {
        cacheControl: "3600",
        upsert: false,
        contentType: coverImage.type,
      });

    if (uploadError) {
      redirect(
        `/admin/berita/create?error=${encodeURIComponent(uploadError.message)}`
      );
    }

    const { data } = supabase.storage
      .from(NEWS_IMAGES_BUCKET)
      .getPublicUrl(filePath);

    coverImageUrl = data.publicUrl;
  }

  const { error } = await supabase.from("news").insert({
    title,
    slug,
    excerpt: excerpt || null,
    content,
    cover_image_url: coverImageUrl,
    is_published: isPublished,
    published_at: isPublished ? new Date().toISOString() : null,
  });

  if (error) {
    redirect(`/admin/berita/create?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/berita?success=Berita berhasil ditambahkan");
}