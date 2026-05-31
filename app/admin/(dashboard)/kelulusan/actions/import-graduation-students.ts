"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import * as XLSX from "xlsx";

type GraduationExcelRow = {
  nis?: string | number;
  nisn?: string | number;
  student_name?: string;
  class_name?: string;
  major?: string;
  status?: string;
  note?: string;
};

function cleanText(value: unknown) {
  return String(value || "").trim();
}

function normalizeStatus(value: unknown) {
  const status = cleanText(value).toUpperCase().replace(/\s+/g, "_");

  if (status === "LULUS") {
    return "LULUS";
  }

  if (
    status === "TIDAK_LULUS" ||
    status === "TIDAK LULUS" ||
    status === "TIDAKLULUS"
  ) {
    return "TIDAK_LULUS";
  }

  return "";
}

export async function importGraduationStudents(formData: FormData) {
  const file = formData.get("file");

  if (!(file instanceof File)) {
    redirect("/admin/kelulusan?error=File Excel wajib diupload");
  }

  if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
    redirect("/admin/kelulusan?error=Format file harus .xlsx atau .xls");
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheetName = workbook.SheetNames[0];

  if (!sheetName) {
    redirect("/admin/kelulusan?error=Sheet Excel tidak ditemukan");
  }

  const worksheet = workbook.Sheets[sheetName];

  const rows = XLSX.utils.sheet_to_json<GraduationExcelRow>(worksheet, {
    defval: "",
  });

  if (!rows.length) {
    redirect("/admin/kelulusan?error=Data Excel kosong");
  }

  const students = rows.map((row, index) => {
    const nis = cleanText(row.nis);
    const nisn = cleanText(row.nisn);
    const studentName = cleanText(row.student_name);
    const className = cleanText(row.class_name);
    const major = cleanText(row.major);
    const status = normalizeStatus(row.status);
    const note = cleanText(row.note);

    const rowNumber = index + 2;

    if (!nis && !nisn) {
      throw new Error(`Baris ${rowNumber}: NIS atau NISN wajib diisi`);
    }

    if (!studentName) {
      throw new Error(`Baris ${rowNumber}: student_name wajib diisi`);
    }

    if (!status) {
      throw new Error(
        `Baris ${rowNumber}: status wajib LULUS atau TIDAK_LULUS`
      );
    }

    return {
      nis: nis || null,
      nisn: nisn || null,
      student_name: studentName,
      class_name: className || null,
      major: major || null,
      status,
      note: note || null,
    };
  });

  const supabase = await createClient();

  const { error: deleteError } = await supabase
    .from("graduation_students")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    redirect(
      `/admin/kelulusan?error=${encodeURIComponent(deleteError.message)}`
    );
  }

  const { error: insertError } = await supabase
    .from("graduation_students")
    .insert(students);

  if (insertError) {
    redirect(
      `/admin/kelulusan?error=${encodeURIComponent(insertError.message)}`
    );
  }

  redirect(
    `/admin/kelulusan?success=${students.length} data kelulusan berhasil diimport`
  );
}