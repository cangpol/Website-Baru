import { NextResponse } from "next/server";
import { z } from "zod";
import { requirePermission } from "@/lib/auth";
import { getHomepageContent, saveHomepageInstagramAction } from "@/server/homepage";

export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  timeAgo: string;
  likeCount: number;
  commentCount: number;
  category: string;
}

const instagramActionSchema = z.object({
  action: z.enum(["LOGIN", "CONNECT", "LOGOUT", "DISCONNECT", "ADD_POST", "NEW_POST"]),
  username: z.string().trim().min(1).max(30).optional(),
  post: z.object({
    caption: z.string().max(2200).optional(),
    mediaUrl: z.string().max(2048).optional(),
    permalink: z.string().max(2048).optional(),
    category: z.string().trim().min(1).max(100).optional(),
  }).optional(),
}).superRefine((data, context) => {
  if ((data.action === "ADD_POST" || data.action === "NEW_POST") && !data.post) {
    context.addIssue({
      code: "custom",
      path: ["post"],
      message: "Objek postingan tidak ditemukan.",
    });
  }
});

function isSafeMediaUrl(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isInstagramPermalink(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      (url.hostname === "instagram.com" || url.hostname === "www.instagram.com");
  } catch {
    return false;
  }
}

export async function GET() {
  try {
    const { instagram } = await getHomepageContent();
    return NextResponse.json({
      success: true,
      isConnected: false,
      account: instagram.handle,
      displayName: instagram.handle,
      profilePicUrl: "/images/logo.png",
      bio: "Feed ini dikelola melalui CMS beranda. Koneksi Instagram Graph API belum dikonfigurasi.",
      followersCount: 0,
      followingCount: 0,
      postsCount: instagram.posts.length,
      connectedAt: "",
      tokenExpiresAt: "Koneksi Instagram Graph API belum dikonfigurasi",
      profileUrl: instagram.profileUrl,
      posts: instagram.posts.map((post) => ({
        ...post,
        timestamp: "",
        likeCount: 0,
        commentCount: 0,
      })),
    });
  } catch (error) {
    console.error("Error in GET /api/instagram:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil feed Instagram CMS." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requirePermission("beranda", "update");
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const status = /harus login/i.test(message)
      ? 401
      : /hak akses|tidak memiliki izin/i.test(message)
        ? 403
        : 500;
    return NextResponse.json(
      { success: false, error: status === 500 ? "Gagal mengotorisasi permintaan." : message },
      { status }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Format permintaan tidak valid." },
      { status: 400 }
    );
  }

  const parsed = instagramActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: "Data permintaan Instagram tidak valid." },
      { status: 400 }
    );
  }

  const { action, post } = parsed.data;
  if (action === "LOGIN" || action === "CONNECT" || action === "LOGOUT" || action === "DISCONNECT") {
    return NextResponse.json(
      { success: false, error: "Koneksi Instagram OAuth belum dikonfigurasi. Feed CMS beranda tetap dapat dikelola." },
      { status: 503 }
    );
  }

  if (!post) {
    return NextResponse.json({ success: false, error: "Objek postingan tidak ditemukan." }, { status: 400 });
  }
  if (!post.caption?.trim() || !post.mediaUrl || !post.permalink || !post.category) {
    return NextResponse.json(
      { success: false, error: "Caption, media, tautan Instagram, dan kategori wajib diisi." },
      { status: 400 }
    );
  }
  if (!isSafeMediaUrl(post.mediaUrl) || !isInstagramPermalink(post.permalink)) {
    return NextResponse.json(
      { success: false, error: "URL media atau tautan Instagram tidak valid." },
      { status: 400 }
    );
  }

  try {
    const { instagram } = await getHomepageContent();
    const result = await saveHomepageInstagramAction({
      ...instagram,
      posts: [
        {
          id: `ig_post_${Date.now()}`,
          caption: post.caption.trim(),
          mediaUrl: post.mediaUrl,
          permalink: post.permalink,
          timeAgo: "Baru saja",
          category: post.category,
        },
        ...instagram.posts,
      ].slice(0, 12),
    });

    if (!result.ok || !result.data) {
      return NextResponse.json(
        { success: false, error: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Postingan berhasil disimpan ke CMS feed beranda.",
      posts: result.data.posts.map((savedPost) => ({
        ...savedPost,
        timestamp: "",
        likeCount: 0,
        commentCount: 0,
      })),
    });
  } catch (error) {
    console.error("Error in POST /api/instagram:", error);
    return NextResponse.json(
      { success: false, error: "Gagal menyimpan postingan ke CMS feed beranda." },
      { status: 500 }
    );
  }
}
