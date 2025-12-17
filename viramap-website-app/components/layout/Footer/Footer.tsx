// components/layout/Footer/Footer.tsx
import Link from "next/link";
import {
  getFooterData,
  type FooterMenuSection,
} from "@/components/lib/footerData";

const footerLinkBaseClasses =
  "text-gray-300 hover:text-[#FB6514] transition-colors text-sm";

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  block?: boolean;
}

const FooterLink = ({ href, children, block }: FooterLinkProps) => (
  <Link
    href={href}
    className={`${footerLinkBaseClasses}${block ? " block py-1" : ""}`}
  >
    {children}
  </Link>
);

const Footer = async () => {
  // دریافت داده‌ها - خیلی ساده
  const footerData = await getFooterData();
  const { about, menuSections, contactInfo } = footerData;

  return (
    <footer className="bg-[#141414]/70 backdrop-blur-md text-white w-full">
      <div className="container mx-auto px-5 sm:px-8 lg:px-32 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          {/* بخش راست */}
          <div className="lg:w-2/5">
            {/* لوگو */}
            <div className="flex items-center gap-2 mb-8">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* ... لوگو SVG ... */}
              </svg>
              <span className="text-[#E4E4E7] text-[18px] leading-[32px] font-semibold mr-1">
                ویرامپ
              </span>
            </div>

            {/* متن توضیحی */}
            <div className="mb-8">
              <p
                className="text-[#E4E4E7] text-[14px] leading-[26px] font-normal max-w-[320px]"
                dangerouslySetInnerHTML={{ __html: about.content }}
              />
            </div>

            {/* آیکون‌های شبکه‌های اجتماعی */}
            {/* ... کد شبکه‌های اجتماعی ... */}
          </div>

          {/* بخش چپ - لینک‌ها */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* رندر منوها */}
              {menuSections.map((section: FooterMenuSection, index: number) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold mb-6">
                    {section.title}
                  </h4>
                  <ul
                    className={
                      section.title === "راه کارها" ? "space-y-2" : "space-y-4"
                    }
                  >
                    {section.links.map(
                      (
                        link: FooterMenuSection["links"][number],
                        linkIndex: number
                      ) => (
                        <li key={linkIndex}>
                          <FooterLink
                            href={link.url}
                            block={section.title === "راه کارها"}
                          >
                            {link.name}
                          </FooterLink>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}

              {/* تماس با ما */}
              <div>
                <h4 className="text-lg font-semibold mb-6">تماس با ما</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex items-start gap-2">
                    {/* آیکون آدرس */}
                    <span className="text-sm">{contactInfo.address}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {/* آیکون ایمیل */}
                    <span className="text-sm">{contactInfo.email}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {/* آیکون تلفن */}
                    <span className="text-sm">{contactInfo.phone}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* خط جداکننده و بخش پایینی */}
      {/* ... کد پایینی بدون تغییر ... */}
    </footer>
  );
};

export default Footer;
