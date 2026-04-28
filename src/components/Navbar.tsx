"use client";

import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-40 glass-nav">
        <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <img src="/pinkluxconcierge-logo.jpeg" alt="Pink Lux Concierge" className="h-14 md:h-20 w-14 md:w-20 object-cover rounded-full" />
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Services</a>
            <a href="#experience" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Experience</a>
            <a href="#faq" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">FAQs</a>
            <div className="flex items-center">
              <ThemeToggle />
            </div>
            <a href="#booking" className="bg-primary text-on-primary px-6 py-2 rounded-full font-medium text-sm hover:opacity-80 transition-opacity active:scale-95 duration-200">
              Reserve Your Stay
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button 
              className="text-primary p-2"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Independent Mobile menu overlay */}
      <div 
        className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "var(--glass-bg)", backdropFilter: "blur(30px)" }}
      >
        {/* Mobile Header (Inside Overlay) */}
        <div className="flex justify-between items-center w-full px-6 py-4 border-b border-primary/10">
          <div className="flex items-center gap-2">
            <img src="/pinkluxconcierge-logo.jpeg" alt="Pink Lux Concierge" className="h-16 w-16 object-cover rounded-full" />
          </div>
          <button 
            className="text-primary p-2"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="flex flex-col items-center pt-24 h-full gap-8 p-6 overflow-y-auto pb-32">
          <a 
            href="#services" 
            className="text-3xl font-headline italic text-primary hover:tracking-widest transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Services
          </a>
          <a 
            href="#experience" 
            className="text-3xl font-headline italic text-primary hover:tracking-widest transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            Experience
          </a>
          <a 
            href="#faq" 
            className="text-3xl font-headline italic text-primary hover:tracking-widest transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            FAQs
          </a>
          <div className="w-16 h-[1px] bg-primary/20 my-6 shrink-0" />
          <a 
            href="#booking"
            className="bg-primary text-on-primary px-12 py-5 rounded-full font-bold editorial-shadow active:scale-95 transition-all text-xl shrink-0 text-center"
            onClick={() => setIsOpen(false)}
          >
            Reserve Your Stay
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
