'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const solutionsDropdownRef = useRef<HTMLDivElement>(null);
  const techDropdownRef = useRef<HTMLDivElement>(null);

  const solutions = [
    { id: 'healthcare', label: 'مراکز بهداشتی و درمانی', path: '/solutions/healthcare' },
    { id: 'airports', label: 'فرودگاه‌ها', path: '/solutions/airports' },
    { id: 'exhibitions', label: 'نمایشگاه‌ها', path: '/solutions/exhibitions' },
    { id: 'pilgrimage', label: 'اماکن زیارتی', path: '/solutions/pilgrimage' },
    { id: 'universities', label: 'دانشگاه‌ها و مراکز آموزشی', path: '/solutions/universities' },
    { id: 'malls', label: 'مجتمع‌های تجاری و مال‌ها', path: '/solutions/malls' },
    { id: 'stadiums', label: 'ورزشگاه‌ها و استادیوم‌ها', path: '/solutions/stadiums' },
    { id: 'industrial', label: 'واحد‌های صنعتی و تولیدی', path: '/solutions/industrial' }
  ];

  const technologies = [
    { id: 'technologies', label: 'تکنولوژی‌ها', path: '/technologies' },
    { id: 'platform', label: 'پلتفرم', path: '/platform' }
  ];

  const navItems = [
    { href: '/articles', label: 'اخبار و مقالات' },
    { href: '/about', label: 'درباره ویرامپ' },
    { href: '/about-us', label: 'همکاری با ما' }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsDropdownRef.current && !solutionsDropdownRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
      if (techDropdownRef.current && !techDropdownRef.current.contains(event.target as Node)) {
        setIsTechOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsSolutionsOpen(false);
    setIsTechOpen(false);
    setIsMenuOpen(false);
  }, [pathname]);

  const dropdownStyle = (isOpen: boolean): React.CSSProperties => ({
    position: 'absolute',
    top: 'calc(100% + 8px)',
    right: '0',
    minWidth: '200px',
    backgroundColor: 'rgba(30, 30, 30, 0.95)',
    backdropFilter: 'blur(12px)',
    borderRadius: '12px',
    padding: '12px 0',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.3s ease',
    zIndex: 1001,
  });

  return (
    <>
      {/* OUTER HEADER: full-viewport width so background / blur stretches edge-to-edge */}
      <header
        style={{
          position: 'fixed',
          top: '24px',
          left: 0,
          right: 0,
          width: '100%',
          padding: '0 16px', // فضای کناری کلی برای صفحه خیلی کوچک
          zIndex: 1000,
          pointerEvents: 'auto'
        }}
      >
        {/* INNER CONTAINER: این کارت همان ظاهر قبلی را حفظ می‌کند */}
        <div
          style={{
            margin: '0 auto',
            width: 'calc(100% - 160px)', // همون عرض قبلی برای دسکتاپ (قابل تغییر)
            maxWidth: '1480px',
            height: '72px',
            borderRadius: '16px',
            backgroundColor: 'rgba(250, 250, 250, 0.1)',
            backdropFilter: 'blur(6px)',
            padding: '12px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            fontFamily: 'Vazirmatn, system-ui',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxSizing: 'border-box'
          }}
        >
          {/* LOGO */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
              <path d="M18.2267 39.7388L21.7547 31.4433C19.3391 27.089 14.1647 17.3696 12.7917 13.3267C12.6658 12.9562 12.5722 12.1301 12.5148 11.8011C11.9463 8.53924 14.5323 7.74126 16.0336 7.51029C12.2196 6.65214 5.31308 12.4197 3.82876 14.0895C2.30309 15.8058 2.84347 16.7593 3.06596 17.2361L18.2267 39.7388Z" fill="url(#p0)"/>
              <path d="M31.1944 2.64744C27.9524 4.64965 20.0475 10.0848 15.6614 13.2313C20.3336 15.4244 20.7058 15.6153 22.8989 15.6153C24.6152 15.6153 28.835 12.5639 32.434 10.0847C35.5096 4.26835 32.9107 1.58748 31.1944 2.64744Z" fill="url(#p1)"/>
              <path d="M32.434 10.0847C29.2874 18.2851 22.0407 32.7784 18.4174 39.9295C19.0531 40.5015 20.8965 41.3023 22.0407 39.9295C23.471 38.2134 37.3922 17.0454 39.1085 10.2755C39.5102 8.69122 36.765 1.31256 34.4363 1.3125C33.2921 1.31247 32.0526 2.11746 31.1944 2.64744Z" fill="url(#p2)"/>
              <path d="M16.0336 7.51029C14.5323 7.74126 11.9463 8.53924 12.5148 11.8011C12.5148 11.8011 14.2311 12.6592 14.8986 12.6592C15.5661 12.6592 18.9987 9.32196 18.7126 8.6545C18.4266 7.98705 16.0336 7.51029 16.0336 7.51029Z" fill="url(#p3)"/>
              <defs>
                <linearGradient id="p0" x1="10" y1="9" x2="20" y2="36"><stop stopColor="#FB6514"/><stop offset=".95" stopColor="#B2480E"/></linearGradient>
                <linearGradient id="p1" x1="17" y1="13" x2="34" y2="4"><stop stopColor="#FB6514"/><stop offset=".95" stopColor="#B2480E"/></linearGradient>
                <linearGradient id="p2" x1="37" y1="5" x2="20" y2="40"><stop stopColor="#FB6514"/><stop offset=".95" stopColor="#B2480E"/></linearGradient>
                <linearGradient id="p3" x1="19" y1="9" x2="13" y2="10"><stop stopColor="#FB6514"/><stop offset=".95" stopColor="#B2480E"/></linearGradient>
              </defs>
            </svg>

            <span style={{ color: '#E4E4E7', fontSize: '18px', fontWeight: 600 }}>ویرامپ</span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              href="/"
              style={{
                fontWeight: 600,
                fontSize: '14px',
                padding: '8px 16px',
                borderRadius: '9999px',
                color: activeLink === '/' ? '#FB6514' : '#E4E4E7',
                backgroundColor: activeLink === '/' ? 'rgba(251,101,20,0.3)' : 'transparent',
                textDecoration: 'none',
                transition: '0.3s',
              }}
              onMouseEnter={() => setActiveLink('/')}
              onMouseLeave={() => setActiveLink('')}
            >
              خانه
            </Link>

            {/* TECHNOLOGY DROPDOWN */}
            <div ref={techDropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsTechOpen(!isTechOpen)}
                style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor:
                    pathname === '/technologies' || pathname === '/platform'
                      ? 'rgba(251,101,20,0.3)'
                      : 'transparent',
                  color:
                    pathname === '/technologies' || pathname === '/platform'
                      ? '#FB6514'
                      : '#E4E4E7',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                تکنولوژی‌ها
                <svg width="16" height="16" style={{ transform: isTechOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              <div style={dropdownStyle(isTechOpen)}>
                {technologies.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    style={{
                      display: 'block',
                      padding: '10px 20px',
                      color: pathname === item.path ? '#FB6514' : '#E4E4E7',
                      textDecoration: 'none',
                      borderRight: pathname === item.path ? '3px solid #FB6514' : 'none',
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
                  fontSize: '14px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  color: activeLink === item.href ? '#FB6514' : '#E4E4E7',
                  backgroundColor: activeLink === item.href ? 'rgba(251,101,20,0.3)' : 'transparent',
                  textDecoration: 'none',
                  transition: '0.3s',
                }}
                onMouseEnter={() => setActiveLink(item.href)}
                onMouseLeave={() => setActiveLink('')}
              >
                {item.label}
              </Link>
            ))}

            {/* SOLUTION DROPDOWN */}
            <div ref={solutionsDropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
                style={{
                  fontWeight: 600,
                  fontSize: '14px',
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  backgroundColor: pathname.includes('/solutions') ? 'rgba(251,101,20,0.3)' : 'transparent',
                  color: pathname.includes('/solutions') ? '#FB6514' : '#E4E4E7',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                راهکارها
                <svg width="16" height="16" style={{ transform: isSolutionsOpen ? 'rotate(180deg)' : 'none', transition: '0.3s' }}>
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>

              <div style={dropdownStyle(isSolutionsOpen)}>
                {solutions.map((s) => (
                  <Link
                    key={s.id}
                    href={s.path}
                    style={{
                      display: 'block',
                      padding: '10px 20px',
                      color: pathname === s.path ? '#FB6514' : '#E4E4E7',
                      borderRight: pathname === s.path ? '3px solid #FB6514' : 'none',
                      textDecoration: 'none',
                    }}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              style={{
                backgroundColor: isHovered ? '#B2480E' : '#FB6514',
                color: 'white',
                padding: '8px 24px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              تماس با ما
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              className="mobile-menu-btn"
              style={{
                display: 'none',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
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
          position: 'fixed',
          top: 0,
          right: isMenuOpen ? 0 : '-100%',
          width: '100%',
          height: '100vh',
          background: 'rgba(20,20,20,0.95)',
          backdropFilter: 'blur(12px)',
          transition: '0.3s',
          padding: '24px',
          zIndex: 2000,
        }}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '20px',
            marginBottom: '32px',
            cursor: 'pointer',
          }}
        >
          ×
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>خانه</Link>

          <details style={{ color: '#fff' }}>
            <summary>تکنولوژی‌ها</summary>
            <div style={{ paddingRight: '12px' }}>
              {technologies.map((t) => (
                <Link key={t.id} href={t.path} style={{ display: 'block', padding: '6px 0', color: '#ccc', textDecoration: 'none' }}>
                  {t.label}
                </Link>
              ))}
            </div>
          </details>

          {navItems.map((item) => (
            <Link key={item.href} href={item.href} style={{ color: '#fff', textDecoration: 'none' }}>
              {item.label}
            </Link>
          ))}

          <details style={{ color: '#fff' }}>
            <summary>راهکارها</summary>
            <div style={{ paddingRight: '12px' }}>
              {solutions.map((s) => (
                <Link key={s.id} href={s.path} style={{ display: 'block', padding: '6px 0', color: '#ccc', textDecoration: 'none' }}>
                  {s.label}
                </Link>
              ))}
            </div>
          </details>

          <button
            style={{
              marginTop: '24px',
              padding: '10px',
              background: '#FB6514',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontWeight: 600,
              cursor: 'pointer',
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

          /* در موبایل کارت داخلی هم تمام عرض می‌شود تا ظاهر بهتر باشد */
          header > div {
            width: 100% !important;
            max-width: 100% !important;
            border-radius: 0 !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
