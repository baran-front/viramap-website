// lib/footer-data.ts
import { safeFetch } from "./api";
import { API_CONFIG } from "./constants";

// انواع داده
export type CmsContentItem = {
  id: number;
  name: string;
  content: string;
  groupName: string;
  locale: string;
};

export type FooterMenuSection = {
  title: string;
  links: Array<{
    name: string;
    url: string;
  }>;
};

export type ContactInfo = {
  address: string;
  email: string;
  phone: string;
};

// داده‌های پیش‌فرض
export const DEFAULT_FOOTER_DATA = {
  about: {
    content:
      "شرکت ما، زیرمجموعه‌ای از *شرکت اروین ویرا*، با تمرکز بر ارائه‌ی راهکارهای نوین و هوشمند، به بهبود مسیریابی و ارائه خدمات موقعیت‌یابی داخلی (Indoor Mapping) در فضاهای بزرگ و پیچیده می‌پردازد. هدف ما افزایش رضایت و راحتی کاربران در مکان‌های گسترده‌ای مانند بیمارستان‌ها، استادیوم‌ها، و مراکز تجاری است.",
  },
  menuSections: [
    {
      title: "دسترسی سریع",
      links: [
        { name: "اخبار و مقالات", url: "/articles" },
        { name: "درباره مسیریاب‌داخلی", url: "/about-indoor" },
        { name: "درباره ویرامپ", url: "/about-us" },
        { name: "درخواست همکاری", url: "/careers" },
      ],
    },
    {
      title: "محصولات",
      links: [
        { name: "نقشه برداری داخلی", url: "/products/indoor-mapping" },
        { name: "ناوبری داخلی", url: "/products/indoor-navigation" },
        { name: "ردیابی داخلی", url: "/products/indoor-tracking" },
      ],
    },
    {
      title: "راه کارها",
      links: [
        { name: "مراکز بهداشتی و درمانی", url: "/solutions/healthcare" },
        { name: "فرودگاه‌ها", url: "/solutions/airports" },
        { name: "نمایشگاه‌ها", url: "/solutions/exhibitions" },
        { name: "اماکن زیارتی", url: "/solutions/pilgrimage" },
        { name: "دانشگاه‌ها و مراکز آموزشی", url: "/solutions/universities" },
        { name: "مجتمع‌های تجاری و مال‌ها", url: "/solutions/malls" },
        { name: "ورزشگاه‌ها و استادیوم‌ها", url: "/solutions/stadiums" },
        { name: "واحد‌های صنعتی و تولیدی", url: "/solutions/industrial" },
      ],
    },
  ],
  contactInfo: {
    address: "مشهد، خیام جنوبی ۲۶، پلاک ۱۰، طبقه ۵",
    email: "Arvinvira@Info.com",
    phone: "09129090990",
  },
};

/**
 * دریافت متن درباره شرکت از CMS
 */
export async function fetchFooterAboutContent() {
  try {
    // تست endpointهای مختلف
    const endpoints = [
      "/api/v1/cms/client/by-group-name/footer-about", // GET
      "/v1/cms/client/by-group-name/footer-about", // GET دیگر
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await safeFetch<CmsContentItem[]>(
          endpoint,
          { method: "GET" },
          {
            tenant: API_CONFIG.DEFAULT_TENANT,
            locale: API_CONFIG.DEFAULT_LOCALE,
          }
        );

        if (response.ok && response.result?.data?.length) {
          return {
            ok: true,
            data: response.result.data[0].content,
          };
        }
      } catch (error) {
        // ادامه می‌دهیم به endpoint بعدی
        console.log(`Endpoint ${endpoint} کار نکرد، تست بعدی...`);
      }
    }

    // اگر هیچکدام کار نکرد
    return {
      ok: false,
      data: DEFAULT_FOOTER_DATA.about.content,
      error: "نتوانستم از CMS داده دریافت کنم",
    };
  } catch (error) {
    console.error("خطا در دریافت متن فوتر:", error);
    return {
      ok: false,
      data: DEFAULT_FOOTER_DATA.about.content,
      error: error instanceof Error ? error.message : "خطای ناشناخته",
    };
  }
}

/**
 * دریافت کامل داده‌های فوتر
 */
export async function getFooterData(): Promise<{
  about: { content: string };
  menuSections: FooterMenuSection[];
  contactInfo: ContactInfo;
}> {
  try {
    const aboutResult = await fetchFooterAboutContent();

    return {
      about: { content: aboutResult.data },
      menuSections: DEFAULT_FOOTER_DATA.menuSections,
      contactInfo: DEFAULT_FOOTER_DATA.contactInfo,
    };
  } catch (error) {
    console.error("خطا در دریافت داده‌های فوتر:", error);
    return DEFAULT_FOOTER_DATA;
  }
}
