// components/layout/Header/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  const navItems = [
    { href: '/', label: 'خانه' },
    { href: '/solutions', label: 'راهکار ها' },
    { href: '/technologies', label: 'تکنولوژی ها' },
    { href: '/news', label: 'اخبار و مقالات' },
    { href: '/about', label: 'درباره ویرامپ' },
    { href: '/careers', label: 'همکاری با ما' }
  ];

  // استایل اصلی هدر
  const headerStyle = {
    position: 'fixed' as const,
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

  // استایل لینک‌ها
  const linkStyle = (isActive: boolean) => ({
    fontFamily: 'Vazirmatn, system-ui',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '32px',
    color: '#E4E4E7',
    textAlign: 'right' as const,
    padding: '8px 16px',
    borderRadius: '9999px',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? 'rgba(251, 101, 20, 0.3)' : 'transparent',
    backdropFilter: isActive ? 'blur(24px)' : 'none',
    textDecoration: 'none'
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
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href}
            style={linkStyle(activeLink === item.href)}
            onMouseEnter={() => setActiveLink(item.href)}
            onMouseLeave={() => setActiveLink('')}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* دکمه CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{
          backgroundColor: '#FB6514',
          color: 'white',
          padding: '8px 24px',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '14px',
          fontFamily: 'Vazirmatn, system-ui',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}>
          تماس با ما
        </button>
      </div>
    </header>
  );
};

export default Header;