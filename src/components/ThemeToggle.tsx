"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 hover:bg-primary/20 active:scale-90 ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun icon */}
      <span
        className={`material-symbols-outlined text-[20px] leading-none theme-toggle-icon absolute inset-0 flex items-center justify-center ${
          theme === "light"
            ? "opacity-100 rotate-0"
            : "opacity-0 -rotate-90"
        }`}
        style={{ color: "var(--color-primary)" }}
      >
        light_mode
      </span>

      {/* Moon icon */}
      <span
        className={`material-symbols-outlined text-[20px] leading-none theme-toggle-icon absolute inset-0 flex items-center justify-center ${
          theme === "dark"
            ? "opacity-100 rotate-0"
            : "opacity-0 rotate-90"
        }`}
        style={{ color: "var(--color-primary)" }}
      >
        dark_mode
      </span>
    </button>
  );
}
