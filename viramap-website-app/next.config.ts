import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // بهینه‌سازی تصاویر
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // فشرده‌سازی
  compress: true,

  // بهینه‌سازی تولید (Next.js 16 به صورت پیش‌فرض از SWC استفاده می‌کند)
  // swcMinify: true, // در Next.js 16 به صورت پیش‌فرض فعال است

  // بهینه‌سازی bundle
  experimental: {
    optimizeCss: true,
  },

  // بهینه‌سازی headers برای cache
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
