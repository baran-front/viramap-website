import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ویرامپ | راهکارهای مسیریابی داخلی",
    short_name: "ویرامپ",
    description:
      "راهکارهای پیشرفته مسیریابی داخلی و نقشه‌های هوشمند برای مراکز خرید، فرودگاه‌ها، بیمارستان‌ها و اماکن عمومی",
    start_url: "/",
    display: "standalone",
    background_color: "#141414",
    theme_color: "#FB6514",
    icons: [
      {
        src: "/images/Logo/logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
    lang: "fa",
    dir: "rtl",
    orientation: "portrait-primary",
  };
}

