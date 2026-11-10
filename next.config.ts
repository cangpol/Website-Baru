import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "*.upitra.ac.id",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=63072000; includeSubDomains; preload",
                },
              ]
            : []),
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Menu Profil kini berjalan di dalam /profil (tab), halaman lama dialihkan.
      { source: "/profil/tentang-upitra", destination: "/profil", permanent: true },
      { source: "/profil/visi-misi-tujuan", destination: "/profil?tab=visi-misi", permanent: true },
      { source: "/profil/pimpinan-universitas", destination: "/profil?tab=pimpinan", permanent: true },
      { source: "/profil/berita-kampus", destination: "/profil?tab=berita", permanent: true },
      { source: "/profil/pengumuman", destination: "/profil?tab=pengumuman", permanent: true },
      {
        source: "/berita",
        destination: "/riset",
        permanent: true,
      },
      {
        source: "/berita/:slug*",
        destination: "/riset/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
