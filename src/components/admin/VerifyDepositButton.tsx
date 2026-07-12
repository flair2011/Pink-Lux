"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyDeposit } from "@/app/actions/adminActions";
import { CheckCircle, Loader2 } from "lucide-react";

export default function VerifyDepositButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleVerify = async () => {
    setIsProcessing(true);
    const res = await verifyDeposit(bookingId);
    if (res.success) {
      router.refresh(); // Soft refresh to pick up new Server state
    } else {
      alert(res.error);
    }
    setIsProcessing(false);
  };

  return (
    <button
      onClick={(e) => { e.stopPropagation(); handleVerify(); }}
      disabled={isProcessing}
      className="w-full md:w-auto px-4 py-2 bg-primary text-on-primary text-sm font-bold rounded-lg hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
      Verify Deposit
    </button>
  );
}
