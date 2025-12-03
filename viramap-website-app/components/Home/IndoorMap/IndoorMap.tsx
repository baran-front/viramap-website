// components/home/IndoorMap/IndoorMap.tsx
'use client';

const IndoorMap = () => {
  return (
    <div>
        <section style={{
        minHeight: '100vh',
        backgroundColor: '#141414',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        fontFamily: 'Vazirmatn, system-ui'
        }}>
        
        {/* Main Container */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '80px',
            maxWidth: '1400px',
            width: '100%'
        }}>

            {/* Right Side - Content (60%) */}
            <div style={{
            flex: '0 0 50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
            }}>
            
            {/* Title Frame */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-satart',
                width: '616px',
                marginBottom: '24px'
            }}>
                <h1 style={{
                fontFamily: "'Morabba', 'Vazirmatn', system-ui",
                fontWeight: 700,
                fontSize: '28px',
                lineHeight: '1.4',
                color: '#E4E4E7',
                textAlign: 'right',
                margin: 0
                }}>
                با دنیای مسیریابی داخلی (Indoormap) آشنا شوید
                </h1>
            </div>

            {/* Description Text */}
            <div style={{
                width: '640px',
                fontFamily: "'Yekan Bakh', 'Vazirmatn', system-ui",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '32px',
                color: '#E4E4E7',
                textAlign: 'right',
                marginBottom: '40px'
            }}>
                <p style={{textAlign:'justify',textJustify:'inter-word'}}>
                Indoormap یک تکنولوژی نوآورانه است که برای مسیریابی و هدایت در محیط‌های داخلی توسعه یافته است. با این فناوری، کاربران می‌توانند به سادگی راه خود را در ساختمان‌های پیچیده و مکان‌های شلوغ مثل بیمارستان‌ها، فرودگاه‌ها، و مراکز تجاری پیدا کنند. Indoormap راه‌حلی هوشمند برای رفع نیازهای مسیریابی داخلی شماست.
                </p>
            </div>

            {/* Button - اطلاعات بیشتر */}
            <button style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px 20px',
                gap: '8px',
                width: '167px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                position: 'relative',
                alignSelf: 'flex-end'
            }}>
                
                <span style={{
                fontFamily: "'Yekan Bakh', 'Vazirmatn', system-ui",
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '26px',
                color: '#FB6514'
                }}>
                مطالعه بیشتر
                </span>
                {/* Arrow Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M15.0001 19.9201L8.48009 13.4001C7.71009 12.6301 7.71009 11.3701 8.48009 10.6001L15.0001 4.08008" stroke="#FB6514" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            </div>

            {/* Left Side - Image (40%) */}
            <div style={{
            flex: '0 0 50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            <div style={{
                width: '100%',
                maxWidth: '700px',
                height: '700px',
                backgroundImage: "url('/images/indormap/indoormap.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '24px'
            }}>
            </div>
            </div>
        </div>
        </section>
        {/* ///////////////////////////////////////////////////////// */}
        <section style={{
        minHeight: '100vh',
        backgroundColor: '#141414',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        fontFamily: 'Vazirmatn, system-ui'
        }}>
            {/* Main Container */}
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '80px',
            maxWidth: '1400px',
            width: '100%'
        }}>

            {/* Right Side */}
            <div style={{
            flex: '0 0 45%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            <div style={{
                width: '100%',
                maxWidth: '455px',
                height: '600px',
                backgroundImage: "url('/images/indormap/phoneimg.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: '24px',
                
            }}>
            </div>
            </div>

            {/* Left Side */}
            <div style={{
            flex: '0 0 55%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
            }}>
            
            {/* Title Frame */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-satart',
                width: '616px',
                marginBottom: '24px'
            }}>
                <h1 style={{
                fontFamily: "'Morabba', 'Vazirmatn', system-ui",
                fontWeight: 700,
                fontSize: '28px',
                lineHeight: '1.4',
                color: '#E4E4E7',
                textAlign: 'right',
                margin: 0
                }}>
                با دنیای مسیریابی داخلی (Indoormap) آشنا شوید
                </h1>
            </div>

            {/* Description Text */}
            <div style={{
                width: '640px',
                fontFamily: "'Yekan Bakh', 'Vazirmatn', system-ui",
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '32px',
                color: '#E4E4E7',
                textAlign: 'right',
                marginBottom: '40px'
            }}>
                <p style={{textAlign:'justify',textJustify:'inter-word'}}>
                Indoormap یک تکنولوژی نوآورانه است که برای مسیریابی و هدایت در محیط‌های داخلی توسعه یافته است. با این فناوری، کاربران می‌توانند به سادگی راه خود را در ساختمان‌های پیچیده و مکان‌های شلوغ مثل بیمارستان‌ها، فرودگاه‌ها، و مراکز تجاری پیدا کنند. Indoormap راه‌حلی هوشمند برای رفع نیازهای مسیریابی داخلی شماست.
                </p>
            </div>

            {/* Button - اطلاعات بیشتر */}
            <button style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '12px 20px',
                gap: '8px',
                width: '167px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                position: 'relative',
                left:'35px',
                alignSelf: 'flex-end'
            }}>
                
                <span style={{
                fontFamily: "'Yekan Bakh', 'Vazirmatn', system-ui",
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '26px',
                color: '#FB6514'
                }}>
                مطالعه بیشتر
                </span>
                {/* Arrow Icon */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                <path d="M15.0001 19.9201L8.48009 13.4001C7.71009 12.6301 7.71009 11.3701 8.48009 10.6001L15.0001 4.08008" stroke="#FB6514" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>

            </div>
        </div>
        </section>
    </div>    
  );
};

export default IndoorMap;