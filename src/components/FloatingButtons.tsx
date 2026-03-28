"use client";

import React from "react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      <button className="bg-white/50 text-primary p-4 backdrop-blur-lg rounded-full shadow-editorial hover:scale-110 transition-transform">
        <span className="material-symbols-outlined">chat</span>
      </button>
      <button className="bg-primary text-on-primary p-4 rounded-full shadow-editorial hover:scale-110 transition-transform">
        <span className="material-symbols-outlined">phone_in_talk</span>
      </button>
    </div>
  );
};

export default FloatingButtons;
