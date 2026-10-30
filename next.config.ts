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
  async redirects() {
    return [
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
