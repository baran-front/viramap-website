'use client';

import { Slide } from './types';

interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
  index: number;
}

const SlideItem = ({ slide, isActive }: SlideItemProps) => {
  if (!isActive) return null;

  return (
    <div className="slide-item"
       style={{
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'translateX(0)' : 'translateX(100px)',
        transition: 'all 0.5s ease',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        fontFamily: 'Vazirmatn, system-ui',
        zIndex: isActive ? 2 : 1, // اسلاید فعال روی بالا باشد
        pointerEvents: isActive ? 'auto' : 'none', // فقط اسلاید فعال قابل کلیک باشد
        }}>
      {/* Device Image Container */}
      <div className="device-container">
        <div className="device-frame">
          <div className="device-screen">
            <div 
              className="screen-image"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
            />
          </div>
          {/* Device Details */}
          <div className="device-volume"></div>
          <div className="device-power"></div>
          <div className="device-camera">
            <div className="camera-lens"></div>
            <div className="camera-sensor"></div>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="content-container">
        {/* Top Section */}
        <div className="top-section">
          <div className="icon-container">
            <div className="routing-icon">
              <div className="vector v1"></div>
              <div className="vector v2"></div>
              <div className="vector v3"></div>
              <div className="vector v4"></div>
              <div className="vector v5"></div>
            </div>
          </div>
          
          <h3 className="slide-title">
            {slide.title}
          </h3>
        </div>

        {/* Description */}
        <p className="slide-description">
          {slide.description}
        </p>
      </div>
    </div>
  );
};

export default SlideItem;