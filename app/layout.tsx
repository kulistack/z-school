import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Z-School",
  description: "Website profil sekolah dan cek kelulusan siswa.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let themeClass = "theme-sd";

  try {
    const supabase = await createClient();

    const { data: setting } = await supabase
      .from("site_settings")
      .select("school_level")
      .limit(1)
      .maybeSingle();

    if (setting?.school_level === "smp") {
      themeClass = "theme-smp";
    }

    if (setting?.school_level === "sma") {
      themeClass = "theme-sma";
    }
  } catch {
    themeClass = "theme-sd";
  }

  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${themeClass} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}