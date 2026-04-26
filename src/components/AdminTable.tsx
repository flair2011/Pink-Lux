"use client";

import React, { useState } from 'react';
import { verifyDeposit } from '@/app/actions/adminActions';
import { ChevronDown, ChevronUp, CheckCircle, Loader2 } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AdminTable({ bookings }: { bookings: any[] }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleVerify = async (id: string) => {
    setProcessingId(id);
    const res = await verifyDeposit(id);
    if (res.success) {
      window.location.reload(); // Simple refresh to pick up new Server state
    } else {
      alert(res.error);
    }
    setProcessingId(null);
  };

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
                className="p-6 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-0 items-center cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : b.id)}
              >
                <div className="font-mono text-primary font-bold">{b.referenceCode}</div>
                <div className="font-medium text-lg md:text-base">{b.clientInfo.fullName}</div>
                <div className="text-on-surface-variant flex items-center gap-2">
                    {b.medicalInfo.surgeryDate}
                </div>
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    isVerified ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                  }`}>
                    {b.status}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-4">
                  {!isVerified && (
                    <button
                      onClick={(e) => { e.stopPropagation(); handleVerify(b.id); }}
                      disabled={processingId === b.id}
                      className="px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center gap-2"
                    >
                      {processingId === b.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                      Verify Deposit
                    </button>
                  )}
                  {isExpanded ? <ChevronUp className="text-outline" /> : <ChevronDown className="text-outline" />}
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
