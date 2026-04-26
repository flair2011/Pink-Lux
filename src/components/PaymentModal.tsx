"use client";

import React, { useState } from "react";
import { Copy, Check, Info } from "lucide-react";
import { BUSINESS_CONFIG } from "@/config/business";
import { notifyOwnerOfDeposit } from "@/app/actions/emailActions";

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  referenceCode 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  referenceCode: string; 
}) {
  const [copiedApp, setCopiedApp] = useState<"cashapp" | "zelle" | null>(null);
  const [isNotifying, setIsNotifying] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, app: "cashapp" | "zelle") => {
    navigator.clipboard.writeText(text);
    setCopiedApp(app);
    setTimeout(() => setCopiedApp(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="bg-surface-container-lowest max-w-lg w-full rounded-[2rem] p-8 relative animate-in fade-in zoom-in duration-300"
        role="dialog"
      >
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3 text-secondary">
            <span className="material-symbols-outlined text-4xl">hourglass_empty</span>
            <h2 className="text-2xl font-headline italic">Status: Pending</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <p className="text-on-surface-variant mb-6">
          Your booking request has been securely received. To verify and confirm your dates, a deposit is required. 
        </p>

        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center mb-6">
          <p className="text-sm text-primary font-semibold mb-2 uppercase tracking-widest">Your Reference Code</p>
          <div className="text-3xl font-mono font-bold tracking-wider text-primary">
            {referenceCode}
          </div>
          <div className="mt-3 flex items-start gap-2 text-left bg-surface-container-low p-3 rounded-lg border border-primary/10">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong>CRITICAL:</strong> Please include exactly this reference code in the notes of your transfer so our system can automatically verify your deposit.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
            <div>
              <p className="text-sm text-on-surface-variant font-medium">Cash App</p>
              <p className="font-semibold">{BUSINESS_CONFIG.PAYMENT.CASH_APP_HANDLE}</p>
            </div>
            <button
              onClick={() => handleCopy(BUSINESS_CONFIG.PAYMENT.CASH_APP_HANDLE, "cashapp")}
              className="p-3 bg-surface-container-highest rounded-full hover:bg-primary hover:text-on-primary transition-colors"
            >
              {copiedApp === "cashapp" ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
            <div>
              <p className="text-sm text-on-surface-variant font-medium">Zelle</p>
              <p className="font-semibold">{BUSINESS_CONFIG.PAYMENT.ZELLE_EMAIL}</p>
            </div>
            <button
              onClick={() => handleCopy(BUSINESS_CONFIG.PAYMENT.ZELLE_EMAIL, "zelle")}
              className="p-3 bg-surface-container-highest rounded-full hover:bg-secondary hover:text-on-secondary transition-colors"
            >
              {copiedApp === "zelle" ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <button
          onClick={async () => {
            setIsNotifying(true);
            await notifyOwnerOfDeposit(referenceCode);
            setIsNotifying(false);
            onClose();
          }}
          disabled={isNotifying}
          className="mt-8 w-full bg-primary text-on-primary font-semibold py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isNotifying ? (
            <div className="w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
          ) : (
            <Check className="w-5 h-5" />
          )}
          {isNotifying ? "Notifying..." : "I have made my deposit"}
        </button>

      </div>
    </div>
  );
}
