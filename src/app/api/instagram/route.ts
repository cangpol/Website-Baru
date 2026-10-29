import { NextResponse } from "next/server";

export interface InstagramPost {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string; // ISO format
  timeAgo: string;
  likeCount: number;
  commentCount: number;
  category: string;
}

export interface ConnectedInstagramAccountData {
  isConnected: boolean;
  username: string;
  displayName: string;
  profilePicUrl: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  connectedAt: string;
  tokenExpiresAt: string;
  recentPosts: InstagramPost[];
}

// In-Memory Global State for Persistent Real-time Instagram Connection
let connectedAccount: ConnectedInstagramAccountData = {
  isConnected: true,
  username: "upitra_campus",
  displayName: "Universitas Pignatelli Triputra",
  profilePicUrl: "/images/logo.png",
  bio: "Official Account of Universitas Pignatelli Triputra (UPITRA) Surakarta. Membangun Generasi Unggul Berkarakter Triputra.",
  followersCount: 14250,
  followingCount: 180,
  postsCount: 428,
  connectedAt: "29 Okt 2026, 12:45 WIB",
  tokenExpiresAt: "Permanen (Sampai Logout Manual)",
  recentPosts: [
    {
      id: "ig_post_01",
      caption: "✨ Selamat & Sukses atas capaian gemilang mahasiswa prodi Rekayasa Perangkat Lunak UPITRA dalam Hackathon Nasional 2026! Terus berinovasi dan harumkan nama almamater.",
      mediaUrl: "/images/upitra-1.jpeg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-28T10:30:00Z",
      timeAgo: "1 hari yang lalu",
      likeCount: 384,
      commentCount: 42,
      category: "Prestasi Mahasiswa",
    },
    {
      id: "ig_post_02",
      caption: "🎓 Kuliah Tamu Spesial bersama CEO Triputra Group membahas 'Inovasi Digital & Kepemimpinan Berkarakter di Era AI'. Mahasiswa antusias menyimak sharing praktis dunia industri.",
      mediaUrl: "/images/prestasi.jpeg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-25T14:15:00Z",
      timeAgo: "4 hari yang lalu",
      likeCount: 512,
      commentCount: 39,
      category: "Kegiatan Kampus",
    },
    {
      id: "ig_post_03",
      caption: "🔥 Jalur Beasiswa Triputra Unggul 2026/2027 telah dibuka! Dapatkan potongan UKT hingga 100% dan jaminan program magang prioritas di ekosistem Triputra Group.",
      mediaUrl: "/images/slide-1.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-22T09:00:00Z",
      timeAgo: "6 hari yang lalu",
      likeCount: 890,
      commentCount: 95,
      category: "Info Beasiswa PMB",
    },
    {
      id: "ig_post_04",
      caption: "📚 Suasana belajar modern, interaktif, dan kolaboratif di kampus UPITRA Solo. Fasilitas laboratorium mutakhir dan perpustakaan digital siap mendampingi riset kreatifmu.",
      mediaUrl: "/images/kuliah-1.jpeg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-20T08:20:00Z",
      timeAgo: "1 minggu yang lalu",
      likeCount: 256,
      commentCount: 15,
      category: "Fasilitas Kampus",
    },
    {
      id: "ig_post_05",
      caption: "🤝 Kunjungan industri dan penandatanganan sinergi strategis antara UPITRA dengan mitra korporasi nasional. Menghubungkan kurikulum kampus dengan kebutuhan industri masa depan.",
      mediaUrl: "/images/feb-full.jpg",
      permalink: "https://www.instagram.com/upitra_campus/",
      timestamp: "2026-10-15T13:45:00Z",
      timeAgo: "2 minggu yang lalu",
      likeCount: 420,
      commentCount: 28,
      category: "Kemitraan Industri",
    },
  ],
};

export async function GET() {
  try {
    // Pastikan diurutkan descending berdasarkan timestamp (postingan paling akhir ke 5 berikutnya)
    const sortedPosts = [...connectedAccount.recentPosts]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      isConnected: connectedAccount.isConnected,
      account: `@${connectedAccount.username}`,
      displayName: connectedAccount.displayName,
      profilePicUrl: connectedAccount.profilePicUrl,
      bio: connectedAccount.bio,
      followersCount: connectedAccount.followersCount,
      followingCount: connectedAccount.followingCount,
      postsCount: connectedAccount.postsCount,
      connectedAt: connectedAccount.connectedAt,
      tokenExpiresAt: connectedAccount.tokenExpiresAt,
      profileUrl: `https://www.instagram.com/${connectedAccount.username}/`,
      posts: sortedPosts,
    });
  } catch (error) {
    console.error("Error in GET /api/instagram:", error);
    return NextResponse.json(
      { success: false, error: "Gagal mengambil data Instagram" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, username, displayName, post, credentials } = body;

    if (action === "LOGIN" || action === "CONNECT") {
      const cleanUser = (username || "upitra_campus").replace("@", "").trim();
      connectedAccount = {
        ...connectedAccount,
        isConnected: true,
        username: cleanUser,
        displayName: displayName || (cleanUser === "upitra_campus" ? "Universitas Pignatelli Triputra" : `@${cleanUser}`),
        connectedAt: new Date().toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) + " • " + new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
        tokenExpiresAt: "Permanen (Sampai Logout Manual)",
      };

      return NextResponse.json({
        success: true,
        message: `Akun Instagram @${cleanUser} berhasil terhubung secara permanen!`,
        account: connectedAccount,
      });
    }

    if (action === "LOGOUT" || action === "DISCONNECT") {
      connectedAccount = {
        ...connectedAccount,
        isConnected: false,
        tokenExpiresAt: "Terputus",
      };

      return NextResponse.json({
        success: true,
        message: "Akun Instagram berhasil diputuskan sambungannya.",
        account: connectedAccount,
      });
    }

    if (action === "ADD_POST" || action === "NEW_POST") {
      if (!post) {
        return NextResponse.json({ success: false, error: "Objek postingan tidak ditemukan" }, { status: 400 });
      }

      const newPostItem: InstagramPost = {
        id: `ig_post_${Date.now()}`,
        caption: post.caption || "Postingan terbaru resmi",
        mediaUrl: post.mediaUrl || "/images/upitra-1.jpeg",
        permalink: post.permalink || `https://www.instagram.com/${connectedAccount.username}/`,
        timestamp: new Date().toISOString(),
        timeAgo: "Baru saja",
        likeCount: post.likeCount || 1,
        commentCount: post.commentCount || 0,
        category: post.category || "Berita Kampus",
      };

      // Sisipkan di posisi pertama, ambil 5 data teratas
      const updatedList = [newPostItem, ...connectedAccount.recentPosts]
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);

      connectedAccount.recentPosts = updatedList;
      connectedAccount.postsCount += 1;

      return NextResponse.json({
        success: true,
        message: "Postingan terbaru berhasil disinkronisasi ke urutan #1 secara real-time!",
        posts: updatedList,
      });
    }

    return NextResponse.json({ success: false, error: "Aksi tidak dikenali" }, { status: 400 });
  } catch (error) {
    console.error("Error in POST /api/instagram:", error);
    return NextResponse.json(
      { success: false, error: "Gagal memproses aksi Instagram" },
      { status: 500 }
    );
  }
}
