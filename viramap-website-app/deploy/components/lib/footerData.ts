/**
 * ماژول مدیریت داده‌های فوتر
 * این ماژول داده‌های فوتر را از API دریافت می‌کند
 */

import { safeFetch } from "./api";
import { API_CONFIG } from "./constants";
import { logger } from "./logger";

// ==================== انواع داده ====================

export type MenuItem = {
  id: number;
  name: string;
  linkUrl: string | null;
  imageUrl: string | null;
  thumbnail: string | null;
  locale: string | null;
  parentId: number | null;
  sortId: number | null;
  groupName: string;
  description: string | null;
  children: MenuItem[];
};

export type MenuApiResponse = {
  data: MenuItem[];
  messages: unknown[];
  succeeded: boolean;
};

export type FooterMenuSection = {
  title: string;
  links: Array<{ name: string; url: string }>;
};

export type ContactInfo = {
  address: string;
  email: string;
  phone: string;
};

export type FooterData = {
  about: { content: string };
  menuSections: FooterMenuSection[];
  contactInfo: ContactInfo;
};

// ==================== داده‌های پیش‌فرض ====================

export const DEFAULT_FOOTER_DATA: FooterData = {
  about: {
    content: `<p>ویرامپ یک پلتفرم پیشرو در زمینه نقشه‌برداری، ناوبری و ردیابی داخلی است. ما با ارائه راه‌کارهای نوآورانه، تجربه حرکت در فضای داخلی را متحول می‌کنیم.</p>`,
  },
  menuSections: [
    {
      title: "دسترسی سریع",
      links: [
        { name: "اخبار و مقالات", url: "/articles" },
        { name: "درباره مسیریاب داخلی", url: "/about-indoor-navigation" },
        { name: "درباره ویرامپ", url: "/about-viramap" },
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
    phone: "۰۹۱۲۹۰۹۰۹۹۰",
  },
};

// ==================== نگاشت گروه‌ها به عناوین ====================

const GROUP_TO_TITLE: Record<string, string> = {
  "footer-quick": "دسترسی سریع",
  "footer-products": "محصولات",
  "header-solutions": "راه کارها",
  "footer-contact": "تماس با ما",
};

// ==================== توابع اصلی ====================

/**
 * دریافت منوها از API بر اساس groupName
 */
export async function fetchMenuByGroup(groupName: string): Promise<MenuItem[]> {
  try {
    logger.log(`📡 Fetching menu ${groupName} from API...`);

    const response = await safeFetch<MenuItem[]>(
      "/v1/menulinks/client/groupnames",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupnames: groupName,
        }),
      },
      {
        tenant: API_CONFIG.DEFAULT_TENANT,
        locale: API_CONFIG.DEFAULT_LOCALE,
        skipAuth: true,
      }
    );

    if (!response.ok) {
      logger.warn(`❌ Error fetching menu ${groupName}:`, response.error);
      return [];
    }

    const raw = response.result as unknown as
      | MenuApiResponse
      | MenuItem[]
      | null;

    let items: MenuItem[] = [];

    // حالت ۱: پاسخ به شکل استاندارد ما { data, messages, succeeded }
    if (raw && !Array.isArray(raw) && "data" in raw) {
      const typed = raw as MenuApiResponse;

      if (typed.succeeded === false) {
        logger.warn(`⚠️ API returned succeeded=false for ${groupName}`);
        return [];
      }

      if (Array.isArray(typed.data)) {
        items = typed.data;
      }
    }

    // حالت ۲: خود API مستقیم آرایه منو را برمی‌گرداند
    if (!items.length && Array.isArray(raw)) {
      items = raw as MenuItem[];
    }

    if (!items.length) {
      logger.warn(`⚠️ No valid data received for menu ${groupName}`);
      return [];
    }

    logger.log(`✅ ${groupName} fetched: ${items.length} items`);
    return items;
  } catch (error) {
    logger.error(`💥 Error fetching menu ${groupName}:`, error);
    return [];
  }
}

/**
 * دریافت محتوای درباره ما از CMS
 * از تابع سطح بالاتر fetchFooterAboutContent استفاده می‌کنیم
 * تا تنظیمات endpoint و احراز هویت مطابق Postman باشد.
 */
import type { CmsContentResponse } from "./fetchs";
import { fetchFooterAboutContent } from "./fetchs";

export async function fetchAboutContent(): Promise<string> {
  try {
    logger.log("📡 Fetching about content from CMS (footer-about)...");

    const result = await fetchFooterAboutContent();

    if (!result.ok || !result.data) {
      logger.log("⚠️ Invalid response for footer-about, using default content");
      return DEFAULT_FOOTER_DATA.about.content;
    }

    const cmsResponse = result.data as CmsContentResponse;

    if (Array.isArray(cmsResponse.data) && cmsResponse.data.length > 0) {
      logger.log("✅ About content successfully fetched from CMS");
      return cmsResponse.data[0].content;
    }

    logger.log("⚠️ footer-about data is empty, using default content");
    return DEFAULT_FOOTER_DATA.about.content;
  } catch (error) {
    logger.error("💥 Error fetching about content:", error);
    return DEFAULT_FOOTER_DATA.about.content;
  }
}

/**
 * استخراج اطلاعات تماس از آیتم‌های منو
 */
function extractContactInfo(contactItems: MenuItem[]): ContactInfo {
  const defaultContact = DEFAULT_FOOTER_DATA.contactInfo;

  if (!contactItems || contactItems.length === 0) {
    logger.log("⚠️ Using default contact information");
    return defaultContact;
  }

  const contactInfo: ContactInfo = { ...defaultContact };

  contactItems.forEach((item) => {
    const desc = item.description || "";
    const name = item.name || "";

    // آدرس
    if (
      desc.includes("خیام") ||
      desc.includes("مشهد") ||
      name.includes("آدرس")
    ) {
      contactInfo.address = desc;
    }

    // ایمیل
    if (desc.includes("@") || desc.includes(".com") || name.includes("ایمیل")) {
      contactInfo.email = desc;
    }

    // تلفن
    if (
      desc.includes("۰۹") ||
      desc.includes("0912") ||
      name.includes("شماره")
    ) {
      contactInfo.phone = desc;
    }
  });

  logger.log("✅ Contact information extracted:", contactInfo);
  return contactInfo;
}

/**
 * دریافت کامل داده‌های فوتر
 */
export async function getFooterData(): Promise<FooterData> {
  try {
    logger.log("🚀 Starting to fetch footer data from API...");

    // لیست گروه‌های مورد نیاز
    const groups = [
      "footer-quick",
      "footer-products",
      "header-solutions",
      "footer-contact",
    ];

    // دریافت تمام منوها به صورت موازی
    const menuPromises = groups.map(async (groupName) => {
      const items = await fetchMenuByGroup(groupName);
      return { groupName, items };
    });

    const menuResults = await Promise.all(menuPromises);

    // ساخت بخش‌های منو
    const menuSections: FooterMenuSection[] = [];

    menuResults.forEach(({ groupName, items }) => {
      // گروه footer-contact فقط برای استخراج اطلاعات تماس است،
      // نباید به‌عنوان یک سکشن جدا در منو نمایش داده شود
      if (groupName === "footer-contact") {
        return;
      }

      if (items && items.length > 0) {
        const sectionTitle = GROUP_TO_TITLE[groupName] || groupName;

        // مرتب‌سازی بر اساس sortId
        const sortedItems = [...items].sort((a, b) => {
          return (a.sortId || 0) - (b.sortId || 0);
        });

        const links = sortedItems
          .filter((item) => item.name && item.linkUrl)
          .map((item) => ({
            name: item.description || item.name,
            url: item.linkUrl || "#",
          }));

        if (links.length > 0) {
          menuSections.push({
            title: sectionTitle,
            links,
          });
          logger.log(`✅ Section ${sectionTitle}: ${links.length} links`);
        }
      }
    });

    // استخراج اطلاعات تماس
    const contactResult = menuResults.find(
      (r) => r.groupName === "footer-contact"
    );
    const contactInfo = extractContactInfo(contactResult?.items || []);

    // دریافت متن درباره ما
    const aboutContent = await fetchAboutContent();

    // استفاده از داده‌های API یا پیش‌فرض
    const finalMenuSections =
      menuSections.length > 0 ? menuSections : DEFAULT_FOOTER_DATA.menuSections;

    logger.log("🎉 Footer data successfully fetched!");
    logger.log({
      sections: finalMenuSections.length,
      hasContact: !!contactResult,
      aboutLength: aboutContent.length,
    });

    return {
      about: { content: aboutContent },
      menuSections: finalMenuSections,
      contactInfo,
    };
  } catch (error) {
    logger.error("💥 Error fetching footer data:", error);
    logger.log("⚠️ Using default footer data");
    return DEFAULT_FOOTER_DATA;
  }
}

/**
 * دریافت لینک‌های شبکه‌های اجتماعی
 */
export async function fetchSocialLinks() {
  try {
    logger.log("📡 Fetching social media links...");

    const socialItems = await fetchMenuByGroup("social-links");

    if (!socialItems || socialItems.length === 0) {
      logger.log("📢 social-links group is empty or does not exist");
      return [];
    }

    const links = socialItems.map((item) => ({
      name: item.description || item.name,
      url: item.linkUrl || "#",
      icon: item.name.toLowerCase(),
    }));

    logger.log(`✅ ${links.length} social media links fetched`);
    return links;
  } catch (error) {
    logger.error("💥 Error fetching social media links:", error);
    return [];
  }
}
