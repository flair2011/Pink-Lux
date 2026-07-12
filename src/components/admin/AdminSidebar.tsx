"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Users, Settings as SettingsIcon, LogOut, type LucideIcon } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { logoutAction } from "@/app/actions/adminActions";

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <>
      {/* Desktop rail */}
      <aside className="hidden md:flex md:flex-col w-64 shrink-0 h-screen sticky top-0 bg-surface-container-lowest border-r border-outline-variant/20 p-6 justify-between editorial-shadow">
        <div className="space-y-8">
          <Link href="/" className="font-headline italic text-2xl text-primary font-bold">
            Pink Lux
          </Link>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(href) ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                <Icon className="w-5 h-5" /> {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-4">
          <ThemeToggle />
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container-high transition-colors"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile topbar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 bg-surface-container-lowest border-b border-outline-variant/20 editorial-shadow">
        <Link href="/" className="font-headline italic text-xl text-primary font-bold">
          Pink Lux
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <form action={logoutAction}>
            <button type="submit" className="text-on-surface-variant p-2" aria-label="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch bg-surface-container-lowest border-t border-outline-variant/20 editorial-shadow"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-semibold transition-colors ${
              isActive(href) ? "text-primary" : "text-on-surface-variant"
            }`}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
