import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPITRA - Universitas Pignatelli Triputra | Campus to Career",
  description: "Portal resmi UPITRA (Universitas Pignatelli Triputra) Surakarta. Temukan program studi, kembangkan potensimu, dan dapatkan pekerjaan sebelum lulus kuliah di bawah naungan Triputra Group.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/images/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/images/favicon.png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-800">
        {children}
      </body>
    </html>
  );
}
