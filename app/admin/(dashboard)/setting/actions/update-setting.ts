"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateSiteSetting(formData: FormData) {
  const id = String(formData.get("id") || "");

  const schoolName = String(formData.get("school_name") || "").trim();
  const schoolLevel = String(formData.get("school_level") || "sd");
  const schoolNpsn = String(formData.get("school_npsn") || "").trim();
  const headmasterName = String(formData.get("headmaster_name") || "").trim();
  const address = String(formData.get("address") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const website = String(formData.get("website") || "").trim();

  const about = String(formData.get("about") || "").trim();
  const history = String(formData.get("history") || "").trim();
  const vision = String(formData.get("vision") || "").trim();
  const mission = String(formData.get("mission") || "").trim();
  const accreditation = String(formData.get("accreditation") || "").trim();

  const graduationMessage = String(
    formData.get("graduation_message") || ""
  ).trim();

  const graduationAnnouncementEnabled =
    formData.get("graduation_announcement_enabled") === "on";

  if (!id) {
    redirect("/admin/setting?error=Data setting tidak ditemukan");
  }

  if (!schoolName) {
    redirect("/admin/setting?error=Nama sekolah wajib diisi");
  }

  if (!["sd", "smp", "sma"].includes(schoolLevel)) {
    redirect("/admin/setting?error=Jenjang sekolah tidak valid");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("site_settings")
    .update({
      school_name: schoolName,
      school_level: schoolLevel,
      school_npsn: schoolNpsn || null,
      headmaster_name: headmasterName || null,
      address: address || null,
      phone: phone || null,
      email: email || null,
      website: website || null,
      about: about || null,
      history: history || null,
      vision: vision || null,
      mission: mission || null,
      accreditation: accreditation || null,
      graduation_message: graduationMessage || null,
      graduation_announcement_enabled: graduationAnnouncementEnabled,
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/setting?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/profil");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/setting");

  redirect("/admin/setting?success=Setting website berhasil disimpan");
}