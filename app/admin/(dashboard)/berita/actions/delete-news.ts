"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteNews(formData: FormData) {
  const id = String(formData.get("id") || "");

  if (!id) {
    redirect("/admin/berita?error=Data berita tidak ditemukan");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("news").delete().eq("id", id);

  if (error) {
    redirect(`/admin/berita?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/berita?success=Berita berhasil dihapus");
}