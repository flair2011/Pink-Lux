import React from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface min-h-screen">
      <header className="bg-surface-container-lowest border-b border-outline-variant/20 px-6 py-4 flex justify-between items-center editorial-shadow">
        <Link href="/" className="font-headline italic text-2xl text-primary font-bold">Pink Lux</Link>
        <div className="text-sm font-semibold px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full">
            Admin Portal
        </div>
      </header>
      <main className="p-6 md:p-12 max-w-7xl mx-auto animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}
