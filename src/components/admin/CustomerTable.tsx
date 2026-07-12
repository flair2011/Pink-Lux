"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Customer } from "@/lib/admin/customers";

export default function CustomerTable({ customers }: { customers: Customer[] }) {
  const [expandedEmail, setExpandedEmail] = useState<string | null>(null);

  if (!customers.length) {
    return (
      <div className="p-12 text-center bg-surface-container-lowest rounded-[2rem] editorial-shadow text-on-surface-variant italic">
        No customers found.
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-[2rem] editorial-shadow overflow-hidden">
      {/* Header */}
      <div className="hidden md:grid grid-cols-4 p-6 bg-surface-container-low border-b border-outline-variant/20 font-bold text-sm tracking-wider text-primary">
        <div>Client Name</div>
        <div>Contact</div>
        <div>Bookings</div>
        <div className="text-right">Last Activity</div>
      </div>

      {/* Body */}
      <div className="divide-y divide-outline-variant/10">
        {customers.map((c) => {
          const isExpanded = expandedEmail === c.email;

          return (
            <div key={c.email} className="transition-colors hover:bg-surface-container-low/50">
              <div
                className="p-5 md:p-6 flex flex-col md:grid md:grid-cols-4 gap-3 md:gap-0 items-start md:items-center cursor-pointer"
                onClick={() => setExpandedEmail(isExpanded ? null : c.email)}
              >
                <div className="w-full md:w-auto flex justify-between items-center">
                  <div className="font-medium text-lg md:text-base">{c.fullName}</div>
                  <div className="md:hidden">
                    {isExpanded ? <ChevronUp className="text-outline" /> : <ChevronDown className="text-outline" />}
                  </div>
                </div>

                <div className="text-on-surface-variant text-sm md:text-base min-w-0">
                  <div className="break-all">{c.email}</div>
                  <div>{c.phone}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-on-surface-variant whitespace-nowrap">
                    {c.bookingCount} booking{c.bookingCount === 1 ? "" : "s"}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-success-container text-on-success-container rounded-full text-xs font-bold whitespace-nowrap">
                    {c.verifiedCount} verified
                  </span>
                </div>

                <div className="w-full md:w-auto mt-2 md:mt-0 flex items-center justify-end gap-4">
                  <span className="text-sm text-on-surface-variant">{new Date(c.lastBookingAt).toLocaleDateString()}</span>
                  <div className="hidden md:block">
                    {isExpanded ? <ChevronUp className="text-outline" /> : <ChevronDown className="text-outline" />}
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="p-6 bg-surface-container-low/30 border-t border-outline-variant/10 space-y-3 text-sm border-l-4 border-l-primary">
                  <h4 className="font-bold text-primary font-headline tracking-wide uppercase">Booking History</h4>
                  {c.bookings.map((b) => (
                    <div key={b.id} className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 p-3 bg-surface-container-lowest rounded-xl">
                      <div className="font-mono text-primary font-bold">{b.referenceCode}</div>
                      <div className="text-on-surface-variant">{b.serviceType || "Short Term Stay"}</div>
                      <div className="text-on-surface-variant">{new Date(b.createdAt).toLocaleDateString()}</div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap w-fit ${
                        b.status === "Deposit Verified" ? "bg-success-container text-on-success-container" : "bg-warning-container text-on-warning-container"
                      }`}>
                        {b.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
