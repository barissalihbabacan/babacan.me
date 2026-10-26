import type { NextConfig } from "next";

// Statik dışa aktarım (Firebase Hosting uyumlu) yapılandırması
const nextConfig: NextConfig = {
  output: "export",
  agentRules: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
