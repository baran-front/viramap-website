// components/layout/Footer/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#141414] text-white w-full">
      {/* بخش اصلی فوتر */}
      <div className="container mx-auto px-32 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16">
          {/* بخش راست (40%) */}
          <div className="lg:w-2/5">
            {/* لوگو */}
            <div className="flex items-center gap-2 mb-8">
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
              <span className="text-[#E4E4E7] text-[18px] leading-[32px] font-semibold mr-1">
                ویرامپ
              </span>
            </div>

            {/* متن توضیحی */}
            <div className="mb-8">
              <p className="text-[#E4E4E7] text-[14px] leading-[26px] font-normal w-full max-w-[320px] h-[208px]">
                شرکت ما، زیرمجموعه‌ای از *شرکت اروین ویرا*، با تمرکز بر ارائه‌ی راهکارهای نوین و هوشمند، به بهبود مسیریابی و ارائه خدمات موقعیت‌یابی داخلی (Indoor Mapping) در فضاهای بزرگ و پیچیده می‌پردازد. هدف ما افزایش رضایت و راحتی کاربران در مکان‌های گسترده‌ای مانند بیمارستان‌ها، استادیوم‌ها، و مراکز تجاری است. با بهره‌گیری از تکنولوژی‌های پیشرفته، خدمات ما به مدیران مکان‌های عمومی امکان می‌دهد تجربه‌ای کاربرپسند، سریع و دقیق برای بازدیدکنندگان فراهم کنند.
              </p>
            </div>

            {/* آیکون‌های شبکه‌های اجتماعی */}
            <div className="flex gap-4">
              <a href="#" className="block">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0317 0H15.9589C7.14503 0 0 7.14713 0 15.9636V16.0364C0 24.8529 7.14503 32 15.9589 32H16.0317C24.8455 32 31.9906 24.8529 31.9906 16.0364V15.9636C31.9906 7.14713 24.8455 0 16.0317 0Z" fill="#52525B" fillOpacity="0.1"/>
                  <path d="M20.9454 6.51001H11.0466C8.31192 6.51001 6.08716 8.73542 6.08716 11.4709V20.5296C6.08716 23.2651 8.31192 25.4905 11.0466 25.4905H20.9454C23.6801 25.4905 25.9049 23.2651 25.9049 20.5296V11.4709C25.9049 8.73542 23.6801 6.51001 20.9454 6.51001ZM7.83671 11.4709C7.83671 9.7007 9.27691 8.26007 11.0466 8.26007H20.9454C22.7151 8.26007 24.1553 9.7007 24.1553 11.4709V20.5296C24.1553 22.2998 22.7151 23.7404 20.9454 23.7404H11.0466C9.27691 23.7404 7.83671 22.2998 7.83671 20.5296V11.4709Z" fill="#A1A1AA"/>
                  <path d="M15.996 20.6135C18.539 20.6135 20.6091 18.544 20.6091 15.999C20.6091 13.4541 18.5402 11.3845 15.996 11.3845C13.4518 11.3845 11.3828 13.4541 11.3828 15.999C11.3828 18.544 13.4518 20.6135 15.996 20.6135ZM15.996 13.1357C17.5752 13.1357 18.8596 14.4205 18.8596 16.0002C18.8596 17.5798 17.5752 18.8646 15.996 18.8646C14.4168 18.8646 13.1324 17.5798 13.1324 16.0002C13.1324 14.4205 14.4168 13.1357 15.996 13.1357Z" fill="#A1A1AA"/>
                  <path d="M21.0362 12.1302C21.721 12.1302 22.2791 11.573 22.2791 10.8869C22.2791 10.2008 21.7221 9.64355 21.0362 9.64355C20.3502 9.64355 19.7932 10.2008 19.7932 10.8869C19.7932 11.573 20.3502 12.1302 21.0362 12.1302Z" fill="#A1A1AA"/>
                </svg>
              </a>
              
              <a href="#" className="block">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0317 0H15.9588C7.14501 0 0 7.14713 0 15.9636V16.0364C0 24.8529 7.14501 32 15.9588 32H16.0317C24.8455 32 31.9906 24.8529 31.9906 16.0364V15.9636C31.9906 7.14713 24.8455 0 16.0317 0Z" fill="#52525B" fillOpacity="0.1"/>
                  <path d="M6.05902 15.4547C6.10385 15.4323 6.14871 15.411 6.19242 15.3908C6.95231 15.0388 7.72229 14.7092 8.49115 14.3795C8.53262 14.3795 8.60209 14.3313 8.64132 14.3156C8.70072 14.2899 8.76013 14.2652 8.81953 14.2394C8.93385 14.1901 9.04818 14.1419 9.16138 14.0925C9.39002 13.995 9.61752 13.8975 9.84616 13.7999L11.2146 13.2136C12.127 12.8234 13.0404 12.4322 13.9527 12.042C14.8651 11.6519 15.7785 11.2606 16.6908 10.8705C17.6031 10.4803 18.5166 10.089 19.4289 9.69889C20.3412 9.30874 21.2547 8.91747 22.167 8.52732C22.3698 8.43988 22.5895 8.30982 22.8069 8.27171C22.9896 8.23919 23.1678 8.17642 23.3516 8.14166C23.7002 8.07551 24.0846 8.04861 24.4186 8.19323C24.5341 8.24368 24.6405 8.31431 24.7291 8.40288C25.1527 8.82218 25.0933 9.51054 25.0037 10.1002C24.3794 14.2103 23.7551 18.3214 23.1297 22.4314C23.0445 22.9953 22.928 23.6142 22.483 23.9707C22.1064 24.2723 21.5707 24.3059 21.1056 24.1781C20.6404 24.0492 20.2302 23.779 19.8279 23.5133C18.159 22.4079 16.4891 21.3024 14.8202 20.197C14.4235 19.9347 13.9819 19.5916 13.9864 19.1151C13.9886 18.8281 14.1601 18.5725 14.3349 18.3449C15.7852 16.4525 17.8777 15.152 19.4345 13.347C19.6542 13.0925 19.8268 12.6328 19.5253 12.486C19.3459 12.3985 19.1397 12.5174 18.9761 12.6306C16.9183 14.06 14.8617 15.4906 12.8039 16.92C12.1326 17.3864 11.4287 17.8662 10.6195 17.9806C9.89549 18.0837 9.16699 17.8819 8.4665 17.6756C7.8792 17.503 7.29301 17.3258 6.70908 17.1431C6.39863 17.0467 6.07808 16.9424 5.83823 16.7238C5.59838 16.5052 5.46055 16.1375 5.60513 15.846C5.69591 15.6632 5.87188 15.5477 6.05681 15.4536L6.05902 15.4547Z" fill="#A1A1AA"/>
                </svg>
              </a>
              
              <a href="#" className="block">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.0317 0H15.9589C7.14504 0 0 7.14713 0 15.9636V16.0364C0 24.8529 7.14504 32 15.9589 32H16.0317C24.8455 32 31.9906 24.8529 31.9906 16.0364V15.9636C31.9906 7.14713 24.8455 0 16.0317 0Z" fill="#52525B" fillOpacity="0.1"/>
                  <path d="M7.62928 10.6361C7.20786 10.2449 6.99829 9.76054 6.99829 9.18429C6.99829 8.60804 7.20899 8.10241 7.62928 7.71002C8.0507 7.31875 8.59316 7.12256 9.25778 7.12256C9.92241 7.12256 10.4436 7.31875 10.8639 7.71002C11.2853 8.10129 11.4949 8.59346 11.4949 9.18429C11.4949 9.77512 11.2842 10.2449 10.8639 10.6361C10.4425 11.0274 9.90784 11.2236 9.25778 11.2236C8.60773 11.2236 8.0507 11.0274 7.62928 10.6361ZM11.1407 12.8806V24.8765H7.35133V12.8806H11.1407Z" fill="#A1A1AA"/>
                  <path d="M23.7551 14.0656C24.5811 14.9624 24.9936 16.1934 24.9936 17.7608V24.6646H21.3947V18.2473C21.3947 17.4569 21.1896 16.8426 20.7805 16.4053C20.3715 15.9681 19.82 15.7483 19.1296 15.7483C18.4392 15.7483 17.8878 15.967 17.4787 16.4053C17.0696 16.8426 16.8645 17.4569 16.8645 18.2473V24.6646H13.2444V12.8469H16.8645V14.4142C17.231 13.8918 17.7253 13.4792 18.3462 13.1754C18.9671 12.8716 19.6654 12.7202 20.4421 12.7202C21.8251 12.7202 22.9302 13.1687 23.7551 14.0644V14.0656Z" fill="#A1A1AA"/>
                </svg>
              </a>
            </div>
          </div>

          {/* بخش چپ (60%) - لینک‌ها */}
          <div className="lg:w-3/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* دسترسی سریع */}
              <div>
                <h4 className="text-lg font-semibold mb-6">دسترسی سریع</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/news" className="text-gray-300 hover:text-white transition-colors">
                      اخبار و مقالات
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-indoor" className="text-gray-300 hover:text-white transition-colors">
                      درباره مسیریاب‌داخلی
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-viramp" className="text-gray-300 hover:text-white transition-colors">
                      درباره ویرامپ
                    </Link>
                  </li>
                  <li>
                    <Link href="/careers" className="text-gray-300 hover:text-white transition-colors">
                      درخواست همکاری
                    </Link>
                  </li>
                </ul>
              </div>

              {/* محصولات */}
              <div>
                <h4 className="text-lg font-semibold mb-6">محصولات</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/products/indoor-mapping" className="text-gray-300 hover:text-white transition-colors">
                      نقشه برداری داخلی
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/indoor-navigation" className="text-gray-300 hover:text-white transition-colors">
                      ناوبری داخلی
                    </Link>
                  </li>
                  <li>
                    <Link href="/products/indoor-tracking" className="text-gray-300 hover:text-white transition-colors">
                      ردیابی داخلی
                    </Link>
                  </li>
                </ul>
              </div>

              {/* راه کارها */}
              <div>
                <h4 className="text-lg font-semibold mb-6">راه کارها</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/solutions/healthcare" className="text-gray-300 hover:text-white transition-colors">
                      مراکز بهداشتی و درمانی
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/stadiums" className="text-gray-300 hover:text-white transition-colors">
                      فرودگاه‌ها
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/shopping-malls" className="text-gray-300 hover:text-white transition-colors">
                      نمایشگاه‌ها
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/airports" className="text-gray-300 hover:text-white transition-colors">
                      اماکن زیارتی
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/healthcare" className="text-gray-300 hover:text-white transition-colors">
                      دانشگاه‌ها و مراکز  آموزشی
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/stadiums" className="text-gray-300 hover:text-white transition-colors">
                      مجتمع‌های تجاری و مال‌ها
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/shopping-malls" className="text-gray-300 hover:text-white transition-colors">
                      ورزشگاه‌ها و استادیوم‌ها
                    </Link>
                  </li>
                  <li>
                    <Link href="/solutions/airports" className="text-gray-300 hover:text-white transition-colors">
                      واحد‌های صنعتی و تولیدی
                    </Link>
                  </li>
                </ul>
              </div>

              {/* تماس با ما */}
              <div>
                <h4 className="text-lg font-semibold mb-6">تماس با ما</h4>
                <ul className="space-y-4 text-gray-300">
                  <li className="flex"> 
                  
                    <span>
                      مشهد، خیام جنوبی ۲۶، پلاک ۱۰، طبقه ۵
                    </span>
                  </li>
                    <li className="flex"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1667 17.0834H5.83341C3.33341 17.0834 1.66675 15.8334 1.66675 12.9167V7.08341C1.66675 4.16675 3.33341 2.91675 5.83341 2.91675H14.1667C16.6667 2.91675 18.3334 4.16675 18.3334 7.08341V12.9167C18.3334 15.8334 16.6667 17.0834 14.1667 17.0834Z" stroke="#E4E4E7" strokeWidth="1.25" strokeMiterlimit="10" strokeLinecap="round" stroke-linejoin="round"/>
                    <path d="M14.1666 7.5L11.5582 9.58333C10.6999 10.2667 9.29158 10.2667 8.43325 9.58333L5.83325 7.5" stroke="#E4E4E7" strokeWidth="1.25" strokeMiterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>
                      Arvinvira@Info.com
                    </span>
                  </li>
                  <li className="flex">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.3084 15.2751C18.3084 15.5751 18.2417 15.8834 18.1001 16.1834C17.9584 16.4834 17.7751 16.7667 17.5334 17.0334C17.1251 17.4834 16.6751 17.8084 16.1667 18.0167C15.6667 18.2251 15.1251 18.3334 14.5417 18.3334C13.6917 18.3334 12.7834 18.1334 11.8251 17.7251C10.8667 17.3167 9.90842 16.7667 8.95842 16.0751C8.00008 15.3751 7.09175 14.6001 6.22508 13.7417C5.36675 12.8751 4.59175 11.9667 3.90008 11.0167C3.21675 10.0667 2.66675 9.11675 2.26675 8.17508C1.86675 7.22508 1.66675 6.31675 1.66675 5.45008C1.66675 4.88341 1.76675 4.34175 1.96675 3.84175C2.16675 3.33341 2.48341 2.86675 2.92508 2.45008C3.45841 1.92508 4.04175 1.66675 4.65841 1.66675C4.89175 1.66675 5.12508 1.71675 5.33341 1.81675C5.55008 1.91675 5.74175 2.06675 5.89175 2.28341L7.82508 5.00841C7.97508 5.21675 8.08341 5.40841 8.15841 5.59175C8.23341 5.76675 8.27508 5.94175 8.27508 6.10008C8.27508 6.30008 8.21675 6.50008 8.10008 6.69175C7.99175 6.88341 7.83341 7.08341 7.63341 7.28341L7.00008 7.94175C6.90841 8.03341 6.86675 8.14175 6.86675 8.27508C6.86675 8.34175 6.87508 8.40008 6.89175 8.46675C6.91675 8.53341 6.94175 8.58341 6.95842 8.63341C7.10842 8.90841 7.36675 9.26675 7.73341 9.70008C8.10841 10.1334 8.50841 10.5751 8.94175 11.0167C9.39175 11.4584 9.82508 11.8667 10.2667 12.2417C10.7001 12.6084 11.0584 12.8584 11.3417 13.0084C11.3834 13.0251 11.4334 13.0501 11.4917 13.0751C11.5584 13.1001 11.6251 13.1084 11.7001 13.1084C11.8417 13.1084 11.9501 13.0584 12.0417 12.9667L12.6751 12.3417C12.8834 12.1334 13.0834 11.9751 13.2751 11.8751C13.4667 11.7584 13.6584 11.7001 13.8667 11.7001C14.0251 11.7001 14.1917 11.7334 14.3751 11.8084C14.5584 11.8834 14.7501 11.9917 14.9584 12.1334L17.7167 14.0917C17.9334 14.2417 18.0834 14.4167 18.1751 14.6251C18.2584 14.8334 18.3084 15.0417 18.3084 15.2751Z" stroke="#E4E4E7" stroke-width="1.25" stroke-miterlimit="10"/>
                    </svg>
                    <span>
                      09129090990
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* خط جداکننده */}
      <div className="w-full">
        <svg width="100%" height="1" viewBox="0 0 1280 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="1" fill="#3F3F46"/>
        </svg>
      </div>

      {/* بخش پایینی */}
      <div className="container mx-auto px-32 py-6">
        <div className="flex justify-between items-center w-full gap-4">

        {/* کپی‌رایت سمت راست */}
        <div className="flex justify-end">
          <p className="text-[#52525B] text-[18px]">
            Design & Develop By ArvinVira Group ©
          </p>
        </div>

        {/* باکس ایمیل سمت چپ */}
        <div className="flex items-center gap-1.5">
          <button className="bg-[#FB6514] hover:bg-[#B2480E] text-white px-6 py-3 rounded-md transition-colors font-medium">
            ارسال
          </button>

          <input
            type="email"
            placeholder="ایمیل خود را وارد کنید"
            className="w-full px-4 py-3 bg-[#27272A] border border-[#3F3F46] rounded-md focus:outline-none focus:ring-1 focus:ring-[#52525B] text-white placeholder:text-gray-400"
            dir="rtl"
          />
        </div>

      </div>
      </div>
    </footer>
  );
};

export default Footer;