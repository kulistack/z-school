"use client";

import { useState } from "react";

type GraduationStudent = {
  student_name: string;
  nis: string | null;
  nisn: string | null;
  class_name: string | null;
  major: string | null;
  status: "LULUS" | "TIDAK_LULUS";
  note: string | null;
};

type GraduationCheckResponse = {
  success: boolean;
  message: string;
  student?: GraduationStudent;
};

export function GraduationCheckForm() {
  const [identifier, setIdentifier] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GraduationCheckResponse | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/graduation/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
        }),
      });

      const data = (await response.json()) as GraduationCheckResponse;

      setResult(data);
    } catch {
      setResult({
        success: false,
        message: "Gagal mengecek data. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <div>
          <label className="text-sm font-medium text-gray-800">
            NIS / NISN
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="Contoh: 1234567890"
            className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-medium text-[var(--primary-foreground)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Mengecek..." : "Cek Sekarang"}
        </button>
      </form>

      {result ? (
        <section className="mt-6">
          {result.success && result.student ? (
            <GraduationResultCard
              message={result.message}
              student={result.student}
            />
          ) : (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-sm leading-6 text-red-700">
              {result.message}
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}

function GraduationResultCard({
  message,
  student,
}: {
  message: string;
  student: GraduationStudent;
}) {
  const isPassed = student.status === "LULUS";

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm ${
        isPassed ? "border-green-200" : "border-red-200"
      }`}
    >
      <div
        className={`p-5 ${
          isPassed ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
        }`}
      >
        <p className="text-sm font-medium uppercase tracking-wide">
          Hasil Kelulusan
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          {isPassed ? "Selamat, Anda Dinyatakan Lulus" : "Tidak Lulus"}
        </h2>

        <p className="mt-2 text-sm leading-6">{message}</p>
      </div>

      <div className="p-5">
        <dl className="space-y-4 text-sm">
          <div>
            <dt className="text-gray-500">Nama Siswa</dt>
            <dd className="mt-1 font-semibold text-gray-950">
              {student.student_name}
            </dd>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <dt className="text-gray-500">NIS</dt>
              <dd className="mt-1 font-semibold text-gray-950">
                {student.nis || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">NISN</dt>
              <dd className="mt-1 font-semibold text-gray-950">
                {student.nisn || "-"}
              </dd>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <dt className="text-gray-500">Kelas</dt>
              <dd className="mt-1 font-semibold text-gray-950">
                {student.class_name || "-"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Jurusan</dt>
              <dd className="mt-1 font-semibold text-gray-950">
                {student.major || "-"}
              </dd>
            </div>
          </div>

          <div>
            <dt className="text-gray-500">Status</dt>
            <dd
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                isPassed
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {isPassed ? "LULUS" : "TIDAK LULUS"}
            </dd>
          </div>

          {student.note ? (
            <div>
              <dt className="text-gray-500">Keterangan</dt>
              <dd className="mt-1 leading-6 text-gray-950">{student.note}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </div>
  );
}