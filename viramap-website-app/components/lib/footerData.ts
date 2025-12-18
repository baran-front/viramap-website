/**
 * ماژول مدیریت داده‌های فوتر
 * این ماژول داده‌های فوتر را از API دریافت می‌کند
 */

import { safeFetch } from "./api";
import { API_CONFIG } from "./constants";

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
    console.log(`📡 در حال دریافت منوی ${groupName} از API...`);
    
    const response = await safeFetch<MenuApiResponse>(
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
      console.warn(`❌ خطا در دریافت منوی ${groupName}:`, response.error);
      return [];
    }

    if (!response.result?.data) {
      console.warn(`⚠️ داده‌ای برای منوی ${groupName} دریافت نشد`);
      return [];
    }

    const apiData = response.result.data;

    if (!apiData.succeeded || !Array.isArray(apiData.data)) {
      console.warn(`⚠️ ساختار داده برای ${groupName} معتبر نیست`);
      return [];
    }

    console.log(`✅ ${groupName} دریافت شد: ${apiData.data.length} آیتم`);
    return apiData.data;
  } catch (error) {
    console.error(`💥 خطا در دریافت منوی ${groupName}:`, error);
    return [];
  }
}

/**
 * دریافت محتوای درباره ما از CMS
 */
export async function fetchAboutContent(): Promise<string> {
  try {
    console.log("📡 در حال دریافت متن درباره ما از CMS...");
    
    // تست دو endpoint مختلف
    const endpoints = [
      "/v1/cms/client/by-group-name/footer-about"
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await safeFetch<{
          data: Array<{ content: string }>;
          succeeded: boolean;
        }>(
          endpoint,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              groupnames: "footer-about",
            }),
          },
          {
            tenant: API_CONFIG.DEFAULT_TENANT,
            locale: API_CONFIG.DEFAULT_LOCALE,
            skipAuth: true,
          }
        );

        if (response.ok && response.result?.data?.data?.length) {
          console.log(`✅ متن درباره ما از ${endpoint} دریافت شد`);
          return response.result.data.data[0].content;
        }
      } catch (error) {
        console.log(`❌ ${endpoint} کار نکرد`);
      }
    }

    console.log("⚠️ از متن پیش‌فرض استفاده می‌شود");
    return DEFAULT_FOOTER_DATA.about.content;
  } catch (error) {
    console.error("💥 خطا در دریافت محتوای درباره ما:", error);
    return DEFAULT_FOOTER_DATA.about.content;
  }
}

/**
 * استخراج اطلاعات تماس از آیتم‌های منو
 */
function extractContactInfo(contactItems: MenuItem[]): ContactInfo {
  const defaultContact = DEFAULT_FOOTER_DATA.contactInfo;
  
  if (!contactItems || contactItems.length === 0) {
    console.log("⚠️ از اطلاعات تماس پیش‌فرض استفاده می‌شود");
    return defaultContact;
  }

  const contactInfo: ContactInfo = { ...defaultContact };

  contactItems.forEach((item) => {
    const desc = item.description || "";
    const name = item.name || "";
    
    // آدرس
    if (desc.includes("خیام") || desc.includes("مشهد") || name.includes("آدرس")) {
      contactInfo.address = desc;
    }
    
    // ایمیل
    if (desc.includes("@") || desc.includes(".com") || name.includes("ایمیل")) {
      contactInfo.email = desc;
    }
    
    // تلفن
    if (desc.includes("۰۹") || desc.includes("0912") || name.includes("شماره")) {
      contactInfo.phone = desc;
    }
  });

  console.log("✅ اطلاعات تماس استخراج شد:", contactInfo);
  return contactInfo;
}

/**
 * دریافت کامل داده‌های فوتر
 */
export async function getFooterData(): Promise<FooterData> {
  try {
    console.log("🚀 شروع دریافت داده‌های فوتر از API...");

    // لیست گروه‌های مورد نیاز
    const groups = ["footer-quick", "footer-products", "header-solutions", "footer-contact"];
    
    // دریافت تمام منوها به صورت موازی
    const menuPromises = groups.map(async (groupName) => {
      const items = await fetchMenuByGroup(groupName);
      return { groupName, items };
    });

    const menuResults = await Promise.all(menuPromises);
    
    // ساخت بخش‌های منو
    const menuSections: FooterMenuSection[] = [];

    menuResults.forEach(({ groupName, items }) => {
      if (items && items.length > 0) {
        const sectionTitle = GROUP_TO_TITLE[groupName] || groupName;
        
        // مرتب‌سازی بر اساس sortId
        const sortedItems = [...items].sort((a, b) => {
          return (a.sortId || 0) - (b.sortId || 0);
        });

        const links = sortedItems
          .filter(item => item.name && item.linkUrl)
          .map(item => ({
            name: item.description || item.name,
            url: item.linkUrl || "#",
          }));

        if (links.length > 0) {
          menuSections.push({
            title: sectionTitle,
            links,
          });
          console.log(`✅ بخش ${sectionTitle}: ${links.length} لینک`);
        }
      }
    });

    // استخراج اطلاعات تماس
    const contactResult = menuResults.find(r => r.groupName === "footer-contact");
    const contactInfo = extractContactInfo(contactResult?.items || []);

    // دریافت متن درباره ما
    const aboutContent = await fetchAboutContent();

    // استفاده از داده‌های API یا پیش‌فرض
    const finalMenuSections = menuSections.length > 0 
      ? menuSections 
      : DEFAULT_FOOTER_DATA.menuSections;

    console.log("🎉 داده‌های فوتر با موفقیت دریافت شد!");
    console.log({
      sections: finalMenuSections.length,
      hasContact: !!contactResult,
      aboutLength: aboutContent.length
    });

    return {
      about: { content: aboutContent },
      menuSections: finalMenuSections,
      contactInfo,
    };
  } catch (error) {
    console.error("💥 خطا در دریافت داده‌های فوتر:", error);
    console.log("⚠️ از داده‌های پیش‌فرض استفاده می‌شود");
    return DEFAULT_FOOTER_DATA;
  }
}

/**
 * دریافت لینک‌های شبکه‌های اجتماعی
 */
export async function fetchSocialLinks() {
  try {
    console.log("📡 در حال دریافت شبکه‌های اجتماعی...");
    
    const socialItems = await fetchMenuByGroup("social-links");
    
    if (!socialItems || socialItems.length === 0) {
      console.log("📢 گروه social-links خالی است یا وجود ندارد");
      return [];
    }

    const links = socialItems.map(item => ({
      name: item.description || item.name,
      url: item.linkUrl || "#",
      icon: item.name.toLowerCase(),
    }));

    console.log(`✅ ${links.length} شبکه اجتماعی دریافت شد`);
    return links;
  } catch (error) {
    console.error("💥 خطا در دریافت شبکه‌های اجتماعی:", error);
    return [];
  }
}