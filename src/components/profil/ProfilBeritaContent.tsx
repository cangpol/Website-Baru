"use client";

import { useEffect, useState } from "react";
import { staticArticles, type NewsArticle } from "@/lib/newsData";
import BeritaKampusClient from "@/components/BeritaKampusClient";

interface ApiArticle {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  category: string | null;
  coverImage: string | null;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  attachmentSize?: string | null;
  authorName?: string | null;
  publishedAt: string;
}

function toNewsArticle(a: ApiArticle): NewsArticle {
  const date = new Date(a.publishedAt);
  return {
    id: a.id,
    slug: a.slug,
    title: a.title,
    summary: a.summary || a.title,
    content: [a.content],
    htmlContent: a.content,
    category: "News",
    categoryLabel: a.category || "Berita Kampus",
    coverImage: a.coverImage || "/images/kegiatan.jpg",
    attachmentUrl: a.attachmentUrl || undefined,
    attachmentName: a.attachmentName || undefined,
    attachmentSize: a.attachmentSize || undefined,
    publishedDate: a.publishedAt.split("T")[0],
    publishedAt: date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    readTime: "3 menit baca",
    author: { name: a.authorName || "Humas UPITRA", role: "Redaksi Kampus", avatar: "/images/logo.png" },
  };
}

// Berita dibaca dari database (yang dikelola di /admin/riset); data statis hanya cadangan
// bila database belum berisi berita yang terbit.
export default function ProfilBeritaContent() {
  const [articles, setArticles] = useState<NewsArticle[]>(staticArticles);

  useEffect(() => {
    fetch("/api/articles?limit=50")
      .then((r) => r.json())
      .then((j) => {
        if (j?.ok && Array.isArray(j.data) && j.data.length > 0) setArticles(j.data.map(toNewsArticle));
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <BeritaKampusClient initialArticles={articles} />
    </div>
  );
}
