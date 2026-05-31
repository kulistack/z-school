"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function deleteGraduationStudents() {
  const supabase = await createClient();

  const { error } = await supabase
    .from("graduation_students")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) {
    redirect(`/admin/kelulusan?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/admin/kelulusan?success=Semua data kelulusan berhasil dihapus");
}