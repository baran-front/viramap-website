"use client";

import { memo } from "react";
import { Slide } from "./types";
import SlideIcon from "./SlideIcon";

interface SlideItemProps {
  slide: Slide;
  isActive: boolean;
  index: number;
}

const SlideItem = memo(
  ({ slide, isActive }: SlideItemProps) => {
    if (!isActive) return null;

    return (
      <div
        className={`slide-item ${isActive ? "active" : ""}`}
        style={{
          fontFamily: "Vazirmatn, system-ui",
          zIndex: isActive ? 2 : 1, // اسلاید فعال روی بالا باشد
          pointerEvents: isActive ? "auto" : "none", // فقط اسلاید فعال قابل کلیک باشد
        }}
      >
        {/* Device Image Container */}
        <div className="device-container">
          <div className="device-frame">
            <div className="device-screen">
              {/* Responsive: Screen image scales proportionally using CSS background-size: contain to show full content */}
              <div
                className="screen-image"
                style={{
                  backgroundImage: `url(${slide.imageUrl})`,
                  backgroundSize: "contain", // Ensures full image is visible without cropping
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
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
              <SlideIcon id={slide.id} />
            </div>

            <h3 className="slide-title">{slide.title}</h3>
          </div>

          {/* Description */}
          <p className="slide-description">{slide.description}</p>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // فقط اگر isActive یا slide تغییر کرد، re-render کن
    return (
      prevProps.isActive === nextProps.isActive &&
      prevProps.slide.id === nextProps.slide.id
    );
  }
);

SlideItem.displayName = "SlideItem";

export default SlideItem;
