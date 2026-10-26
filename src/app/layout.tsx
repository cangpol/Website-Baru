import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPITRA - Universitas Pignatelli Triputra | Integritas, Karakter & Inovasi",
  description: "Portal resmi UPITRA (Universitas Pignatelli Triputra) Surakarta. Menyelenggarakan pendidikan tinggi unggul berkarakter pada Fakultas Sains & Technology, Fakultas Social Humaniora, dan Fakultas Ekonomika & Bussiness.",
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
