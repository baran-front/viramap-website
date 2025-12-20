"use client";

import { useEffect, useState } from "react";
import styles from "./ContactInfoSection.module.css";
import { getMenuLinksByGroup } from "@/components/lib/apiFunctions";
import type { MenuItem } from "@/components/lib/footerData";
import { logger } from "@/components/lib/logger";

interface ContactFeature {
  id: number;
  title: string;
  value: string;
  value2?: string;
  icon: React.ReactNode;
}

// کامپوننت‌های آیکون که از فایل SVG استفاده می‌کنند
const WebsiteIcon = () => (
  <div className="relative h-14 w-14">
    <img
      src="/images/contact-svg/website.svg"
      alt="Website"
      className="h-14 w-14"
    />
  </div>
);

const EmailIcon = () => (
  <div className="relative h-14 w-14">
    <img
      src="/images/contact-svg/email.svg"
      alt="Email"
      className="h-14 w-14"
    />
  </div>
);

const PhoneIcon = () => (
  <div className="relative h-14 w-14">
    <img src="/images/contact-svg/call.svg" alt="Phone" className="h-14 w-14" />
  </div>
);

const AddressIcon = () => (
  <div className="relative h-14 w-14">
    <img
      src="/images/contact-svg/addres.svg"
      alt="Address"
      className="h-14 w-14"
    />
  </div>
);

// داده‌های پیش‌فرض
const defaultFeatures: ContactFeature[] = [
  {
    id: 1,
    title: "وبسایت",
    value: "www.arvinvira.com",
    icon: <WebsiteIcon />,
  },
  {
    id: 2,
    title: "ایمیل",
    value: "Info@loremIpsum.com",
    icon: <EmailIcon />,
  },
  {
    id: 3,
    title: "تماس",
    value: "۰۹۱۲۵۶۷۸۹۸۷",
    value2: "۰۹۱۲۳۴۵۶۷۸۹",
    icon: <PhoneIcon />,
  },
  {
    id: 4,
    title: "آدرس",
    value: "خراسان رضوی، مشهد، بلوار خیام، خیام جنوبی، پلاک ۱۰، طبقه ۵",
    icon: <AddressIcon />,
  },
];

// تابع برای تعیین آیکون بر اساس نام
const getIconByTitle = (title: string): React.ReactNode => {
  const lowerTitle = title.toLowerCase();
  if (
    lowerTitle.includes("وبسایت") ||
    lowerTitle.includes("website") ||
    lowerTitle.includes("سایت")
  ) {
    return <WebsiteIcon />;
  }
  if (
    lowerTitle.includes("ایمیل") ||
    lowerTitle.includes("email") ||
    lowerTitle.includes("mail")
  ) {
    return <EmailIcon />;
  }
  if (
    lowerTitle.includes("تماس") ||
    lowerTitle.includes("phone") ||
    lowerTitle.includes("تلفن") ||
    lowerTitle.includes("موبایل")
  ) {
    return <PhoneIcon />;
  }
  if (
    lowerTitle.includes("آدرس") ||
    lowerTitle.includes("address") ||
    lowerTitle.includes("موقعیت")
  ) {
    return <AddressIcon />;
  }
  // پیش‌فرض
  return <EmailIcon />;
};

const ContactInfoSection = () => {
  const [contactInfo, setContactInfo] = useState<{
    title: string;
    description: string;
    features: ContactFeature[];
  }>({
    title: "ارتباط با ما، تضمین آینده کسب و کار شماست.",
    description:
      "اجازه دهید با راهکارهای تخصصی و پشتیبانی دلسوزانه، مسیر موفقیت شما را هموار کنیم",
    features: defaultFeatures,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setIsLoading(true);
        const result = await getMenuLinksByGroup({
          groupName: "contact-info-page",
        });

        if (result.ok && result.data) {
          // تبدیل داده‌های API به فرمت مورد نیاز
          let menuItems: MenuItem[] = [];

          if (Array.isArray(result.data)) {
            menuItems = result.data;
          } else if (
            result.data &&
            typeof result.data === "object" &&
            "data" in result.data
          ) {
            const data = (result.data as { data?: MenuItem[] }).data;
            menuItems = Array.isArray(data) ? data : [];
          }

          if (menuItems.length > 0) {
            // مرتب‌سازی بر اساس sortId از چپ به راست (sortId بزرگ‌تر اول)
            const sortedItems = [...menuItems].sort((a, b) => {
              const sortA = a.sortId ?? 999;
              const sortB = b.sortId ?? 999;
              return sortB - sortA;
            });

            const features: ContactFeature[] = sortedItems.map(
              (item, index) => {
                const title = item.name || `آیتم ${index + 1}`;
                const description = item.description || "";

                // اگر description شامل چند خط است (مثل شماره تلفن‌های متعدد)
                const lines = description
                  .split("\n")
                  .filter((line) => line.trim());
                const value = lines[0] || "";
                const value2 = lines[1] || undefined;

                return {
                  id: item.id || index + 1,
                  title,
                  value,
                  value2,
                  icon: getIconByTitle(title),
                };
              }
            );

            setContactInfo((prev) => ({
              ...prev,
              features,
            }));
          }
        }
      } catch (error) {
        logger.error("خطا در دریافت اطلاعات تماس:", error);
        // در صورت خطا، از داده‌های پیش‌فرض استفاده می‌شود
      } finally {
        setIsLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-8 pb-20 md:pt-12 md:pb-24">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-14">
          <h2 className="font-ravi text-4xl md:text-[46px] font-bold text-white leading-tight">
            {contactInfo.title}
          </h2>
          <p className="font-ravi text-lg md:text-xl text-gray-300 leading-9 max-w-3xl">
            {contactInfo.description}
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="px-6 py-7 rounded-2xl bg-gray-800/50 animate-pulse"
                style={{ minHeight: "180px" }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[...contactInfo.features].reverse().map((feature) => (
              <div
                key={feature.id}
                className={`group relative px-6 py-7 transition duration-400 hover:-translate-y-1 ${styles.contactInfoCard}`}
                style={{
                  minHeight: "180px",
                  background:
                    "radial-gradient(50% 50% at 50.11% 50%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.06) 100%)",
                  border: "1px solid #3F3F46",
                  filter: "drop-shadow(14px 14px 100px rgba(0, 0, 0, 0.2))",
                  backdropFilter: "blur(3px)",
                  borderRadius: "16px",
                }}
              >
                <div className="relative flex flex-col items-center text-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl">
                    {feature.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-ravi text-xl font-semibold text-white">
                      {feature.title}
                    </h3>
                    <p className="font-ravi text-base text-gray-300 leading-relaxed">
                      {feature.value}
                    </p>
                    {feature.value2 && (
                      <p className="font-ravi text-base text-gray-300 leading-relaxed">
                        {feature.value2}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactInfoSection;
