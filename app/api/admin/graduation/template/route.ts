import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET() {
  const rows = [
    {
      nis: "12345",
      nisn: "0098765432",
      student_name: "Budi Santoso",
      class_name: "XII IPA 1",
      major: "IPA",
      status: "LULUS",
      note: "Selamat, Anda dinyatakan lulus.",
    },
    {
      nis: "12346",
      nisn: "0098765433",
      student_name: "Siti Aminah",
      class_name: "XII IPS 1",
      major: "IPS",
      status: "TIDAK_LULUS",
      note: "Silakan menghubungi pihak sekolah.",
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(rows, {
    header: [
      "nis",
      "nisn",
      "student_name",
      "class_name",
      "major",
      "status",
      "note",
    ],
  });

  worksheet["!cols"] = [
    { wch: 18 },
    { wch: 18 },
    { wch: 28 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 40 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Data Kelulusan");

  const buffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="template-data-kelulusan-z-school.xlsx"',
    },
  });
}