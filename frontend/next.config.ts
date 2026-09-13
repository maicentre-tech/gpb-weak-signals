import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // API живёт отдельным сервисом; в разработке проксируем, чтобы не
  // заводить CORS внутри банковского контура.
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.ETI_API_URL ?? "http://localhost:8000"}/api/v1/:path*`,
      },
    ];
  },
};

export default config;
