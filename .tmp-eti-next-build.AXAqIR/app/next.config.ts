import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // API живёт отдельным сервисом; в разработке проксируем, чтобы не
  // заводить CORS внутри банковского контура.
  async rewrites() {
    const apiUrl = process.env.ETI_API_URL?.replace(/\/+$/, "");
    if (!apiUrl) return [];

    return [
      {
        source: "/api/v1/:path*",
        destination: `${apiUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default config;
