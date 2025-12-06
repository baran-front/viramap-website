// components/layout/Header/Header.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const solutionsDropdownRef = useRef<HTMLDivElement>(null);
  const techDropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // راهکارها و مسیرهای مربوطه
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

  // تکنولوژی‌ها و پلتفرم
  const technologies = [
    { id: 'technologies', label: 'تکنولوژی‌ها', path: '/technologies' },
    { id: 'platform', label: 'پلتفرم', path: '/platform' }
  ];

  // بستن dropdown وقتی کلیک بیرون از آن انجام شود
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

  // بستن dropdown وقتی مسیر تغییر کند
  useEffect(() => {
    setIsSolutionsOpen(false);
    setIsTechOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/news', label: 'اخبار و مقالات' },
    { href: '/about', label: 'درباره ویرامپ' },
    { href: '/careers', label: 'همکاری با ما' }
  ];

  // استایل اصلی هدر
  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'calc(100% - 160px)',
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
    zIndex: 1000,
    border: '1px solid rgba(255, 255, 255, 0.1)'
  };

  // استایل dropdown
  const getDropdownStyle = (isOpen: boolean): React.CSSProperties => ({
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
    visibility: isOpen ? 'visible' : 'hidden' as 'visible' | 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
    transition: 'all 0.3s ease',
    zIndex: 1001,
  });

  return (
    <header style={headerStyle}>
      {/* لوگو و نام برند */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.2267 39.7388L21.7547 31.4433C19.3391 27.089 14.1647 17.3696 12.7917 13.3267C12.6658 12.9562 12.5722 12.1301 12.5148 11.8011C11.9463 8.53924 14.5323 7.74126 16.0336 7.51029C12.2196 6.65214 5.31308 12.4197 3.82876 14.0895C2.30309 15.8058 2.84347 16.7593 3.06596 17.2361L18.2267 39.7388Z" fill="url(#paint0_linear_8046_1275)"/>
          <path d="M31.1944 2.64744C27.9524 4.64965 20.0475 10.0848 15.6614 13.2313C20.3336 15.4244 20.7058 15.6153 22.8989 15.6153C24.6152 15.6153 28.835 12.5639 32.434 10.0847C35.5096 4.26835 32.9107 1.58748 31.1944 2.64744Z" fill="url(#paint1_linear_8046_1275)"/>
          <path d="M32.434 10.0847C29.2874 18.2851 22.0407 32.7784 18.4174 39.9295C19.0531 40.5015 20.8965 41.3023 22.0407 39.9295C23.471 38.2134 37.3922 17.0454 39.1085 10.2755C39.5102 8.69122 36.765 1.31256 34.4363 1.3125C33.2921 1.31247 32.0526 2.11746 31.1944 2.64744C32.9107 1.58748 35.5096 4.26835 32.434 10.0847Z" fill="url(#paint2_linear_8046_1275)"/>
          <path d="M16.0336 7.51029C14.5323 7.74126 11.9463 8.53924 12.5148 11.8011C12.5148 11.8011 14.2311 12.6592 14.8986 12.6592C15.5661 12.6592 18.9987 9.32196 18.7126 8.6545C18.4266 7.98705 16.0336 7.51029 16.0336 7.51029Z" fill="url(#paint3_linear_8046_1275)"/>
          <defs>
            <linearGradient id="paint0_linear_8046_1275" x1="10.7893" y1="9.0359" x2="19.5616" y2="36.5922" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB6514"/>
              <stop offset="0.951751" stopColor="#B2480E"/>
            </linearGradient>
            <linearGradient id="paint1_linear_8046_1275" x1="16.9871" y1="13.5174" x2="34.3409" y2="4.84047" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB6514"/>
              <stop offset="0.951751" stopColor="#B2480E"/>
            </linearGradient>
            <linearGradient id="paint2_linear_8046_1275" x1="37.6782" y1="5.41258" x2="20.8965" y2="40.6923" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB6514"/>
              <stop offset="0.951751" stopColor="#B2480E"/>
            </linearGradient>
            <linearGradient id="paint3_linear_8046_1275" x1="18.9033" y1="9.13126" x2="13.0869" y2="10.6569" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FB6514"/>
              <stop offset="0.951751" stopColor="#B2480E"/>
            </linearGradient>
          </defs>
        </svg>
        <span style={{
          color: '#E4E4E7',
          fontSize: '18px',
          fontWeight: 600,
          marginRight: '4px'
        }}>
          ویرامپ
        </span>
      </div>

      {/* ناوبری دسکتاپ */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* لینک خانه */}
        <Link 
          href="/"
          style={{
            fontFamily: 'Vazirmatn, system-ui',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '32px',
            color: activeLink === '/' ? '#FB6514' : '#E4E4E7',
            textAlign: 'right' as const,
            padding: '8px 16px',
            borderRadius: '9999px',
            transition: 'all 0.3s ease',
            backgroundColor: activeLink === '/' ? 'rgba(251, 101, 20, 0.3)' : 'transparent',
            backdropFilter: activeLink === '/' ? 'blur(24px)' : 'none',
            textDecoration: 'none'
          }}
          onMouseEnter={() => setActiveLink('/')}
          onMouseLeave={() => setActiveLink('')}
        >
          خانه
        </Link>

        {/* Dropdown برای تکنولوژی‌ها */}
        <div 
          ref={techDropdownRef}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <button
            onClick={() => setIsTechOpen(!isTechOpen)}
            onMouseEnter={() => setIsTechOpen(true)}
            style={{
              fontFamily: 'Vazirmatn, system-ui',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '32px',
              color: pathname === '/technologies' || pathname === '/platform' ? '#FB6514' : '#E4E4E7',
              textAlign: 'right' as const,
              padding: '8px 16px',
              borderRadius: '9999px',
              transition: 'all 0.3s ease',
              backgroundColor: pathname === '/technologies' || pathname === '/platform' ? 'rgba(251, 101, 20, 0.3)' : 'transparent',
              backdropFilter: pathname === '/technologies' || pathname === '/platform' ? 'blur(24px)' : 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            تکنولوژی ها
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              style={{ 
                transform: isTechOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dropdown Menu برای تکنولوژی‌ها */}
          <div style={getDropdownStyle(isTechOpen)}>
            {technologies.map((tech) => (
              <Link
                key={tech.id}
                href={tech.path}
                style={{
                  display: 'block',
                  padding: '10px 20px',
                  color: pathname === tech.path ? '#FB6514' : '#E4E4E7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: 'Vazirmatn, system-ui',
                  transition: 'all 0.2s ease',
                  borderRight: pathname === tech.path ? '3px solid #FB6514' : 'none'
                }}
                onMouseEnter={() => setActiveLink(tech.path)}
                onMouseLeave={() => setActiveLink('')}
              >
                {tech.label}
              </Link>
            ))}
          </div>
        </div>

        {/* سایر لینک‌ها */}
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            style={{
              fontFamily: 'Vazirmatn, system-ui',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '32px',
              color: activeLink === item.href ? '#FB6514' : '#E4E4E7',
              textAlign: 'right' as const,
              padding: '8px 16px',
              borderRadius: '9999px',
              transition: 'all 0.3s ease',
              backgroundColor: activeLink === item.href ? 'rgba(251, 101, 20, 0.3)' : 'transparent',
              backdropFilter: activeLink === item.href ? 'blur(24px)' : 'none',
              textDecoration: 'none'
            }}
            onMouseEnter={() => setActiveLink(item.href)}
            onMouseLeave={() => setActiveLink('')}
          >
            {item.label}
          </Link>
        ))}
        
        {/* Dropdown برای راهکارها */}
        <div 
          ref={solutionsDropdownRef}
          style={{ position: 'relative', display: 'inline-block' }}
        >
          <button
            onClick={() => setIsSolutionsOpen(!isSolutionsOpen)}
            onMouseEnter={() => setIsSolutionsOpen(true)}
            style={{
              fontFamily: 'Vazirmatn, system-ui',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '32px',
              color: pathname.includes('/solutions') ? '#FB6514' : '#E4E4E7',
              textAlign: 'right' as const,
              padding: '8px 16px',
              borderRadius: '9999px',
              transition: 'all 0.3s ease',
              backgroundColor: pathname.includes('/solutions') ? 'rgba(251, 101, 20, 0.3)' : 'transparent',
              backdropFilter: pathname.includes('/solutions') ? 'blur(24px)' : 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            راهکار ها
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none" 
              style={{ 
                transform: isSolutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease'
              }}
            >
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Dropdown Menu */}
          <div style={getDropdownStyle(isSolutionsOpen)}>
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={solution.path}
                style={{
                  display: 'block',
                  padding: '10px 20px',
                  color: pathname === solution.path ? '#FB6514' : '#E4E4E7',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: 'Vazirmatn, system-ui',
                  transition: 'all 0.2s ease',
                  borderRight: pathname === solution.path ? '3px solid #FB6514' : 'none'
                }}
                onMouseEnter={() => setActiveLink(solution.path)}
                onMouseLeave={() => setActiveLink('')}
              >
                {solution.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* دکمه CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          style={{
            backgroundColor: isHovered ? '#B2480E' : '#FB6514',
            color: 'white',
            padding: '8px 24px',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '14px',
            fontFamily: 'Vazirmatn, system-ui',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          تماس با ما
        </button>
      </div>
    </header>
  );
};

export default Header;