"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const pathname = usePathname();

  const solutionsDropdownRef = useRef<HTMLDivElement>(null);
  const techDropdownRef = useRef<HTMLDivElement>(null);
  const phoneDropdownRef = useRef<HTMLDivElement>(null);

  const solutions = [
    {
      id: "healthcare",
      label: "مراکز بهداشتی و درمانی",
      path: "/solutions/healthcare",
    },
    { id: "airports", label: "فرودگاه‌ها", path: "/solutions/airports" },
    { id: "exhibitions", label: "نمایشگاه‌ها", path: "/solutions/exhibitions" },
    { id: "pilgrimage", label: "اماکن زیارتی", path: "/solutions/pilgrimage" },
    {
      id: "universities",
      label: "دانشگاه‌ها و مراکز آموزشی",
      path: "/solutions/universities",
    },
    {
      id: "malls",
      label: "مجتمع‌های تجاری و مال‌ها",
      path: "/solutions/malls",
    },
    {
      id: "stadiums",
      label: "ورزشگاه‌ها و استادیوم‌ها",
      path: "/solutions/stadiums",
    },
    {
      id: "industrial",
      label: "واحد‌های صنعتی و تولیدی",
      path: "/solutions/industrial",
    },
  ];

  const technologies = [
    { id: "technologies", label: "تکنولوژی‌ها", path: "/technologies" },
    { id: "platform", label: "پلتفرم", path: "/platform" },
  ];

  const navItems = [
    { href: "/articles", label: "اخبار و مقالات" },
    { href: "/about", label: "درباره ویرامپ" },
    { href: "/about-us", label: "همکاری با ما" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        solutionsDropdownRef.current &&
        !solutionsDropdownRef.current.contains(event.target as Node)
      ) {
        setIsSolutionsOpen(false);
      }
      if (
        techDropdownRef.current &&
        !techDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTechOpen(false);
      }
      if (
        phoneDropdownRef.current &&
        !phoneDropdownRef.current.contains(event.target as Node)
      ) {
        setShowPhoneNumber(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsSolutionsOpen(false);
    setIsTechOpen(false);
    setIsMenuOpen(false);
    setShowPhoneNumber(false);
  }, [pathname]);

  const dropdownStyle = (isOpen: boolean): React.CSSProperties => ({
    position: "absolute",
    top: "calc(100% + 8px)",
    right: "0",
    minWidth: "200px",
    backgroundColor: "rgba(30, 30, 30, 0.95)",
    backdropFilter: "blur(12px)",
    borderRadius: "12px",
    padding: "12px 0",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    transform: isOpen ? "translateY(0)" : "translateY(-10px)",
    transition: "all 0.3s ease",
    zIndex: 1001,
  });

  return (
    <>
      {/* OUTER HEADER: full-viewport width so background / blur stretches edge-to-edge */}
      <header
        style={{
          position: "fixed",
          top: "24px",
          left: 0,
          right: 0,
          width: "100%",
          padding: "0 16px", // فضای کناری کلی برای صفحه خیلی کوچک
          zIndex: 1000,
          pointerEvents: "auto",
        }}
      >
        {/* INNER CONTAINER: این کارت همان ظاهر قبلی را حفظ می‌کند */}
        <div
          style={{
            margin: "0 auto",
            width: "calc(100% - 160px)", // همون عرض قبلی برای دسکتاپ (قابل تغییر)
            maxWidth: "1480px",
            height: "72px",
            borderRadius: "16px",
            backgroundColor: "rgba(250, 250, 250, 0.1)",
            backdropFilter: "blur(6px)",
            padding: "12px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "all 0.3s ease",
            fontFamily: "Ravi, system-ui",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxSizing: "border-box",
          }}
        >
          {/* LOGO */}
          <div
            className="header-logo"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path
                d="M18.2267 39.7388L21.7547 31.4433C19.3391 27.089 14.1647 17.3696 12.7917 13.3267C12.6658 12.9562 12.5722 12.1301 12.5148 11.8011C11.9463 8.53924 14.5323 7.74126 16.0336 7.51029C12.2196 6.65214 5.31308 12.4197 3.82876 14.0895C2.30309 15.8058 2.84347 16.7593 3.06596 17.2361L18.2267 39.7388Z"
                fill="url(#p0)"
              />
              <path
                d="M31.1944 2.64744C27.9524 4.64965 20.0475 10.0848 15.6614 13.2313C20.3336 15.4244 20.7058 15.6153 22.8989 15.6153C24.6152 15.6153 28.835 12.5639 32.434 10.0847C35.5096 4.26835 32.9107 1.58748 31.1944 2.64744Z"
                fill="url(#p1)"
              />
              <path
                d="M32.434 10.0847C29.2874 18.2851 22.0407 32.7784 18.4174 39.9295C19.0531 40.5015 20.8965 41.3023 22.0407 39.9295C23.471 38.2134 37.3922 17.0454 39.1085 10.2755C39.5102 8.69122 36.765 1.31256 34.4363 1.3125C33.2921 1.31247 32.0526 2.11746 31.1944 2.64744Z"
                fill="url(#p2)"
              />
              <path
                d="M16.0336 7.51029C14.5323 7.74126 11.9463 8.53924 12.5148 11.8011C12.5148 11.8011 14.2311 12.6592 14.8986 12.6592C15.5661 12.6592 18.9987 9.32196 18.7126 8.6545C18.4266 7.98705 16.0336 7.51029 16.0336 7.51029Z"
                fill="url(#p3)"
              />
              <defs>
                <linearGradient id="p0" x1="10" y1="9" x2="20" y2="36">
                  <stop stopColor="#FB6514" />
                  <stop offset=".95" stopColor="#B2480E" />
                </linearGradient>
                <linearGradient id="p1" x1="17" y1="13" x2="34" y2="4">
                  <stop stopColor="#FB6514" />
                  <stop offset=".95" stopColor="#B2480E" />
                </linearGradient>
                <linearGradient id="p2" x1="37" y1="5" x2="20" y2="40">
                  <stop stopColor="#FB6514" />
                  <stop offset=".95" stopColor="#B2480E" />
                </linearGradient>
                <linearGradient id="p3" x1="19" y1="9" x2="13" y2="10">
                  <stop stopColor="#FB6514" />
                  <stop offset=".95" stopColor="#B2480E" />
                </linearGradient>
              </defs>
            </svg>

            <span
              className="logo-text"
              style={{ color: "#E4E4E7", fontSize: "18px", fontWeight: 600 }}
            >
              ویرامپ
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <Link
              href="/"
              style={{
                fontWeight: 600,
                fontSize: "14px",
                padding: "8px 16px",
                borderRadius: "9999px",
                color: activeLink === "/" ? "#FB6514" : "#E4E4E7",
                backgroundColor:
                  activeLink === "/" ? "rgba(251,101,20,0.3)" : "transparent",
                textDecoration: "none",
                transition: "0.3s",
              }}
              onMouseEnter={() => setActiveLink("/")}
              onMouseLeave={() => setActiveLink("")}
            >
              خانه
            </Link>

            {/* TECHNOLOGY DROPDOWN */}
            <div ref={techDropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setIsTechOpen(!isTechOpen)}
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  backgroundColor:
                    pathname === "/technologies" || pathname === "/platform"
                      ? "rgba(251,101,20,0.3)"
                      : "transparent",
                  color:
                    pathname === "/technologies" || pathname === "/platform"
                      ? "#FB6514"
                      : "#E4E4E7",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                تکنولوژی‌ها
                <svg
                  width="16"
                  height="16"
                  style={{
                    transform: isTechOpen ? "rotate(180deg)" : "none",
                    transition: "0.3s",
                  }}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>

              <div style={dropdownStyle(isTechOpen)}>
                {technologies.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    style={{
                      display: "block",
                      padding: "10px 20px",
                      color: pathname === item.path ? "#FB6514" : "#E4E4E7",
                      textDecoration: "none",
                      borderRight:
                        pathname === item.path ? "3px solid #FB6514" : "none",
                    }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* STATIC LINKS */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  color: activeLink === item.href ? "#FB6514" : "#E4E4E7",
                  backgroundColor:
                    activeLink === item.href
                      ? "rgba(251,101,20,0.3)"
                      : "transparent",
                  textDecoration: "none",
                  transition: "0.3s",
                }}
                onMouseEnter={() => setActiveLink(item.href)}
                onMouseLeave={() => setActiveLink("")}
              >
                {item.label}
              </Link>
            ))}

            {/* SOLUTION DROPDOWN */}
            <div ref={solutionsDropdownRef} style={{ position: "relative" }}>
              <button
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  padding: "8px 16px",
                  borderRadius: "9999px",
                  backgroundColor: pathname.includes("/solutions")
                    ? "rgba(251,101,20,0.3)"
                    : "transparent",
                  color: pathname.includes("/solutions")
                    ? "#FB6514"
                    : "#E4E4E7",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                راهکارها
                <svg
                  width="16"
                  height="16"
                  style={{
                    transform: isSolutionsOpen ? "rotate(180deg)" : "none",
                    transition: "0.3s",
                  }}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>

              <div style={dropdownStyle(isSolutionsOpen)}>
                {solutions.map((s) => (
                  <Link
                    key={s.id}
                    href={s.path}
                    style={{
                      display: "block",
                      padding: "10px 20px",
                      color: pathname === s.path ? "#FB6514" : "#E4E4E7",
                      borderRight:
                        pathname === s.path ? "3px solid #FB6514" : "none",
                      textDecoration: "none",
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div
            className="header-cta"
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          >
            <button
              className="desktop-contact-btn"
              style={{
                backgroundColor: isHovered ? "#B2480E" : "#FB6514",
                color: "white",
                padding: "8px 24px",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              تماس با ما
            </button>

            {/* MOBILE PHONE ICON */}
            <div
              ref={phoneDropdownRef}
              className="mobile-phone-icon"
              style={{ position: "relative" }}
            >
              <button
                style={{
                  display: "none",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                }}
                onClick={() => setShowPhoneNumber(!showPhoneNumber)}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3084 15.2751C18.3084 15.5751 18.2417 15.8834 18.1001 16.1834C17.9584 16.4834 17.7751 16.7667 17.5334 17.0334C17.1251 17.4834 16.6751 17.8084 16.1667 18.0167C15.6667 18.2251 15.1251 18.3334 14.5417 18.3334C13.6917 18.3334 12.7834 18.1334 11.8251 17.7251C10.8667 17.3167 9.90842 16.7667 8.95842 16.0751C8.00008 15.3751 7.09175 14.6001 6.22508 13.7417C5.36675 12.8751 4.59175 11.9667 3.90008 11.0167C3.21675 10.0667 2.66675 9.11675 2.26675 8.17508C1.86675 7.22508 1.66675 6.31675 1.66675 5.45008C1.66675 4.88341 1.76675 4.34175 1.96675 3.84175C2.16675 3.33341 2.48341 2.86675 2.92508 2.45008C3.45841 1.92508 4.04175 1.66675 4.65841 1.66675C4.89175 1.66675 5.12508 1.71675 5.33341 1.81675C5.55008 1.91675 5.74175 2.06675 5.89175 2.28341L7.82508 5.00841C7.97508 5.21675 8.08341 5.40841 8.15841 5.59175C8.23341 5.76675 8.27508 5.94175 8.27508 6.10008C8.27508 6.30008 8.21675 6.50008 8.10008 6.69175C7.99175 6.88341 7.83341 7.08341 7.63341 7.28341L7.00008 7.94175C6.90841 8.03341 6.86675 8.14175 6.86675 8.27508C6.86675 8.34175 6.87508 8.40008 6.89175 8.46675C6.91675 8.53341 6.94175 8.58341 6.95842 8.63341C7.10842 8.90841 7.36675 9.26675 7.73341 9.70008C8.10841 10.1334 8.50841 10.5751 8.94175 11.0167C9.39175 11.4584 9.82508 11.8667 10.2667 12.2417C10.7001 12.6084 11.0584 12.8584 11.3417 13.0084C11.3834 13.0251 11.4334 13.0501 11.4917 13.0751C11.5584 13.1001 11.6251 13.1084 11.7001 13.1084C11.8417 13.1084 11.9501 13.0584 12.0417 12.9667L12.6751 12.3417C12.8834 12.1334 13.0834 11.9751 13.2751 11.8751C13.4667 11.7584 13.6584 11.7001 13.8667 11.7001C14.0251 11.7001 14.1917 11.7334 14.3751 11.8084C14.5584 11.8834 14.7501 11.9917 14.9584 12.1334L17.7167 14.0917C17.9334 14.2417 18.0834 14.4167 18.1751 14.6251C18.2584 14.8334 18.3084 15.0417 18.3084 15.2751Z"
                    stroke="#E4E4E7"
                    strokeWidth="1.25"
                    strokeMiterlimit="10"
                  />
                </svg>
              </button>
              {showPhoneNumber && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "0",
                    backgroundColor: "rgba(30, 30, 30, 0.95)",
                    backdropFilter: "blur(12px)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    whiteSpace: "nowrap",
                    zIndex: 1001,
                  }}
                >
                  <span style={{ color: "#E4E4E7", fontSize: "14px" }}>
                    ۰۹۱۲۹۰۹۰۹۹۰
                  </span>
                </div>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="mobile-menu-btn"
              style={{
                display: "none",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setIsMenuOpen(true)}
            >
              <svg width="28" height="28" stroke="#fff">
                <path d="M4 7H24" strokeWidth="2" />
                <path d="M4 14H24" strokeWidth="2" />
                <path d="M4 21H24" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER: FULL WIDTH */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isMenuOpen ? 0 : "-100%",
          width: "100%",
          height: "100vh",
          background: "rgba(20,20,20,0.95)",
          backdropFilter: "blur(12px)",
          transition: "0.3s",
          padding: "24px",
          zIndex: 2000,
        }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "20px",
            marginBottom: "32px",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Link href="/" style={{ color: "#fff", textDecoration: "none" }}>
            خانه
          </Link>

          <details style={{ color: "#fff" }}>
            <summary>تکنولوژی‌ها</summary>
            <div style={{ paddingRight: "12px" }}>
              {technologies.map((t) => (
                <Link
                  key={t.id}
                  href={t.path}
                  style={{
                    display: "block",
                    padding: "6px 0",
                    color: "#ccc",
                    textDecoration: "none",
                  }}
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </details>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ color: "#fff", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}

          <details style={{ color: "#fff" }}>
            <summary>راهکارها</summary>
            <div style={{ paddingRight: "12px" }}>
              {solutions.map((s) => (
                <Link
                  key={s.id}
                  href={s.path}
                  style={{
                    display: "block",
                    padding: "6px 0",
                    color: "#ccc",
                    textDecoration: "none",
                  }}
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </details>

          <button
            style={{
              marginTop: "24px",
              padding: "10px",
              background: "#FB6514",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            تماس با ما
          </button>
        </div>
      </div>

      {/* CSS FOR RESPONSIVE */}
      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .desktop-contact-btn {
            display: none !important;
          }
          .mobile-phone-icon button {
            display: block !important;
          }
          .logo-text {
            display: none !important;
          }

          /* در موبایل کارت داخلی هم تمام عرض می‌شود تا ظاهر بهتر باشد */
          header > div {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 16px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }

          /* Reorder elements for mobile: Hamburger (right) | Logo (center) | Contact (left) */
          header > div {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            position: relative !important;
          }

          .header-logo {
            position: absolute !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            margin: 0 !important;
            z-index: 1 !important;
          }

          .header-cta {
            display: flex !important;
            flex-direction: row-reverse !important;
            gap: 12px !important;
            width: 100% !important;
            justify-content: space-between !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
