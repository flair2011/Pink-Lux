"use client";

import React, { useState, useRef, useEffect } from "react";

interface PremiumSelectProps {
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

const PremiumSelect: React.FC<PremiumSelectProps> = ({ name, value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder || "Select...";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-surface-container-low border border-outline-variant hover:border-primary focus:border-primary rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer transition-colors duration-200 text-left flex items-center justify-between gap-2"
      >
        <span className={value ? "text-on-surface" : "text-on-surface-variant/60"}>
          {selectedLabel}
        </span>
        <svg
          className={`w-4 h-4 text-primary transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-surface-container border border-outline-variant rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange({ target: { name, value: opt.value } });
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 transition-colors duration-150 text-sm ${
                opt.value === value
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-on-surface hover:bg-primary/5 hover:text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PremiumSelect;
