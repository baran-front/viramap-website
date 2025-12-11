"use client";
import "./BackgroundBlur.css";

const BackgroundBlur = () => {
  return (
    <div className="background-blur-wrapper">
      <div className="background-blur-circle circle-1" />
      <div className="background-blur-circle circle-2" />
      <div className="background-blur-circle circle-3" />
      <div className="background-blur-circle circle-4" />
    </div>
  );
};

export default BackgroundBlur;
