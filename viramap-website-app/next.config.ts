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

  // تنظیمات Source Maps
  // غیرفعال کردن source maps در production برای امنیت و کاهش حجم
  productionBrowserSourceMaps: false,
  
  // تنظیمات webpack برای رفع خطاهای Source Map (فقط برای Webpack)
  webpack: (config, { dev, isServer }) => {
    // رفع خطاهای Source Map در development
    if (dev && !isServer) {
      // استفاده از eval-source-map که سازگارتر است
      config.devtool = "eval-source-map";
      
      // نادیده گرفتن source maps در node_modules برای رفع خطاهای parsing
      config.ignoreWarnings = [
        ...(config.ignoreWarnings || []),
        {
          module: /node_modules/,
        },
        /Failed to parse source map/,
        /sourceMapURL could not be parsed/,
      ];
    }
    
    // در production، source maps را کاملاً غیرفعال می‌کنیم
    if (!dev) {
      config.devtool = false;
    }
    
    return config;
  },

  // بهینه‌سازی bundle
  experimental: {
    optimizeCss: true,
    // پشتیبانی از Turbopack (پیش‌فرض در Next.js 16)
    turbo: {
      // تنظیمات Turbopack برای رفع مشکلات Source Map
      resolveAlias: {
        // در صورت نیاز می‌توانید alias اضافه کنید
      },
    },
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
