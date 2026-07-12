"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Booking } from '@/lib/schema/booking';
import VerifyDepositButton from '@/components/admin/VerifyDepositButton';

export default function AdminTable({ bookings }: { bookings: Booking[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!bookings.length) {
    return (
      <div className="p-12 text-center bg-surface-container-lowest rounded-[2rem] editorial-shadow text-on-surface-variant italic">
        No booking requests found.
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest rounded-[2rem] editorial-shadow overflow-hidden">
      {/* Header */}
      <div className="hidden md:grid grid-cols-5 p-6 bg-surface-container-low border-b border-outline-variant/20 font-bold text-sm tracking-wider text-primary">
        <div>Ref Code</div>
        <div>Client Name</div>
        <div>Service/Surgery</div>
        <div>Status</div>
        <div className="text-right">Actions</div>
      </div>

      {/* Body */}
      <div className="divide-y divide-outline-variant/10">
        {bookings.map((b) => {
          const isExpanded = expandedId === b.id;
          const isVerified = b.status === "Deposit Verified";

          return (
            <div key={b.id} className="transition-colors hover:bg-surface-container-low/50">
              <div 
                className="p-5 md:p-6 flex flex-col md:grid md:grid-cols-5 gap-3 md:gap-0 items-start md:items-center cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : b.id)}
              >
                <div className="w-full md:w-auto flex justify-between items-center">
                  <div className="font-mono text-primary font-bold">{b.referenceCode}</div>
                  <div className="md:hidden">
                    {isExpanded ? <ChevronUp className="text-outline" /> : <ChevronDown className="text-outline" />}
                  </div>
                </div>
                
                <div className="font-medium text-lg md:text-base">{b.clientInfo.fullName}</div>
                
                <div className="text-on-surface-variant flex items-center gap-2 text-sm md:text-base">
                    {b.medicalInfo.surgeryDate}
                </div>
                
                <div className="flex flex-col md:flex-row md:flex-wrap items-start gap-2">
                  <span className="inline-flex items-center px-3 py-1 bg-surface-container-high rounded-full text-xs font-bold text-on-surface-variant whitespace-nowrap">
                    {b.serviceType || 'Short Term Stay'}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                    isVerified ? "bg-success-container text-on-success-container" : "bg-warning-container text-on-warning-container"
                  }`}>
                    {b.status}
                  </span>
                </div>
                
                <div className="w-full md:w-auto mt-2 md:mt-0 flex items-center justify-end gap-4">
                  {!isVerified && <VerifyDepositButton bookingId={b.id} />}
                  <div className="hidden md:block">
                    {isExpanded ? <ChevronUp className="text-outline" /> : <ChevronDown className="text-outline" />}
                  </div>
                </div>
              </div>

              {/* Accordion Expansion Detail */}
              {isExpanded && (
                <div className="p-6 bg-surface-container-low/30 border-t border-outline-variant/10 grid md:grid-cols-2 gap-8 text-sm border-l-4 border-l-primary">
                  <div className="space-y-4">
                    <h4 className="font-bold text-primary font-headline tracking-wide uppercase">Client Info</h4>
                    <p><span className="text-on-surface-variant mr-2">Email:</span> {b.clientInfo.email}</p>
                    <p><span className="text-on-surface-variant mr-2">Phone:</span> {b.clientInfo.phone}</p>
                    <p><span className="text-on-surface-variant mr-2">Emerg. Contact:</span> {b.clientInfo.emergencyContact}</p>
                    <p><span className="text-on-surface-variant mr-2">Submitted:</span> {new Date(b.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-primary font-headline tracking-wide uppercase">Medical Profile</h4>
                    <p><span className="text-on-surface-variant mr-2">Type:</span> {b.medicalInfo.surgeryType}</p>
                    <p><span className="text-on-surface-variant mr-2">Date:</span> {b.medicalInfo.surgeryDate}</p>
                    <p><span className="text-on-surface-variant mr-2">Surgeon:</span> {b.medicalInfo.surgeon}</p>
                    <p><span className="text-on-surface-variant mr-2">Facility:</span> {b.medicalInfo.facility}</p>
                    {b.medicalInfo.serviceAddress && (
                      <p><span className="text-on-surface-variant mr-2">Service Address:</span> {b.medicalInfo.serviceAddress}</p>
                    )}
                    <p><span className="text-on-surface-variant mr-2">Allergies:</span> {b.medicalInfo.allergies || 'N/A'}</p>
                    <p><span className="text-on-surface-variant mr-2">Notes:</span> {b.medicalInfo.notes || 'N/A'}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
