"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full transition-all duration-300 hover:bg-primary/10 active:scale-90 ${className}`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Sun icon */}
      <span
        className={`material-symbols-outlined text-xl theme-toggle-icon absolute inset-0 flex items-center justify-center ${
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
        className={`material-symbols-outlined text-xl theme-toggle-icon ${
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
