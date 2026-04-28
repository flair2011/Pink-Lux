"use client";

import React, { useState, useRef, useEffect } from "react";

interface PremiumDatePickerProps {
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  required?: boolean;
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

const PremiumDatePicker: React.FC<PremiumDatePickerProps> = ({ name, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (value) return new Date(value + "T00:00:00");
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  });
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

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const selectDate = (day: number) => {
    const selected = new Date(year, month, day);
    const yyyy = selected.getFullYear();
    const mm = String(selected.getMonth() + 1).padStart(2, "0");
    const dd = String(selected.getDate()).padStart(2, "0");
    onChange({ target: { name, value: `${yyyy}-${mm}-${dd}` } });
    setIsOpen(false);
  };

  const formatDisplay = (val: string) => {
    if (!val) return "";
    const d = new Date(val + "T00:00:00");
    return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const s = new Date(value + "T00:00:00");
    return s.getFullYear() === year && s.getMonth() === month && s.getDate() === day;
  };

  const isPast = (day: number) => {
    const d = new Date(year, month, day);
    return d < today;
  };

  // Build calendar grid
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-surface-container-low border border-outline-variant hover:border-primary focus:border-primary rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none cursor-pointer transition-colors duration-200 text-left flex items-center justify-between gap-2"
      >
        <span className={value ? "text-on-surface" : "text-on-surface-variant/60"}>
          {value ? formatDisplay(value) : "Select a date"}
        </span>
        <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {/* Hidden native input for form validation */}
      <input type="hidden" name={name} value={value} required={required} />

      {isOpen && (
        <div className="absolute z-50 w-80 mt-2 bg-surface-container border border-outline-variant rounded-2xl shadow-2xl p-5 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Month/Year header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="font-semibold text-on-surface text-sm tracking-wide">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-widest py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => (
              <div key={i} className="aspect-square flex items-center justify-center">
                {day ? (
                  <button
                    type="button"
                    disabled={isPast(day)}
                    onClick={() => selectDate(day)}
                    className={`w-9 h-9 rounded-full text-sm font-medium transition-all duration-150 ${
                      isSelected(day)
                        ? "bg-primary text-on-primary shadow-lg shadow-primary/30 scale-110"
                        : isPast(day)
                        ? "text-on-surface-variant/30 cursor-not-allowed"
                        : "text-on-surface hover:bg-primary/10 hover:text-primary active:scale-95"
                    }`}
                  >
                    {day}
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          {/* Today shortcut */}
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex justify-center">
            <button
              type="button"
              onClick={() => {
                setViewDate(new Date());
              }}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Go to Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumDatePicker;
