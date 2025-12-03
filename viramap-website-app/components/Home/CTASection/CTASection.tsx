// components/home/CTASection/CTASection.tsx
'use client';

const CTASection = () => {
  return (
    <section style={{
      backgroundColor: '#141414',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 40px',
      fontFamily: 'Vazirmatn, system-ui',
      textAlign: 'center'
    }}>
      
      {/* Main Container */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
        maxWidth: '800px'
      }}>
        
        {/* دکمه مشاوره رایگان (بالا) */}
        <div style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          padding: '5px 16px',
          gap: '24px',
          width: '110px',
          height: '35px',
          background: 'linear-gradient(270deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
          borderRadius: '8px',
          border:'1px solid #344054'
        }}>
          <span style={{
            fontFamily: "'Yekan Bakh', 'Vazirmatn', system-ui",
            fontWeight: 400,
            fontSize: '12px',
            lineHeight: '22px',
            color: '#FFFFFF',
            textAlign: 'right'
          }}>
            مشاوره رایگان
          </span>
        </div>

        {/* عنوان اصلی */}
        <h2 style={{
          fontFamily: "'Morabba', 'Vazirmatn', system-ui",
          fontWeight: 'bold',
          fontSize: '30px',
          lineHeight: '57px',
          color: '#FAFAFA',
          textAlign: 'center',
          margin: 0
        }}>
          با ویرامپ، مسیر ها را روشن کنید...
        </h2>

        {/* توضیحات */}
        <p style={{
          fontFamily: "'Yekan Bakh', 'Vazirmatn', system-ui",
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '32px',
          color: '#E4E4E7',
          textAlign: 'center',
          maxWidth: '796px',
          margin: 0
        }}>
          با کمک مسیریابی هوشمند، تجربه‌ای خودکفا و لذت‌بخش برای بازدیدکنندگان فراهم کنید.
        </p>

        {/* دکمه تماس با ما */}
        <button style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '12px 20px',
          gap: '8px',
          width: '135px',
          height: '48px',
          backgroundColor: '#FB6514',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          marginTop: '16px'
        }}>
          <span style={{
            fontFamily: "'Yekan Bakh', 'Vazirmatn', system-ui",
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '26px',
            color: '#E4E4E7',
            textAlign: 'center'
          }}>
            تماس با ما
          </span>
        </button>

      </div>
    </section>
  );
};

export default CTASection;