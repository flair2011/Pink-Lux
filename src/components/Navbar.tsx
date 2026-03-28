"use client";

import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl shadow-editorial">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">spa</span>
          <span className="text-xl font-headline italic text-primary">
            Pink Lux Concierge
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Services</a>
          <a href="#experience" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Experience</a>
          <a href="#faq" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">FAQs</a>
          <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-medium text-sm hover:opacity-80 transition-opacity active:scale-95 duration-200">
            Reserve Your Stay
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
