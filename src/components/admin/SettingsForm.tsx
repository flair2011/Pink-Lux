"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { updateBusinessSettings } from "@/app/actions/settingsActions";
import type { PaymentSettings } from "@/config/business";

export default function SettingsForm({ initialSettings }: { initialSettings: PaymentSettings }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    CASH_APP_HANDLE: initialSettings.CASH_APP_HANDLE,
    ZELLE_HANDLE: initialSettings.ZELLE_HANDLE,
    DEPOSIT_AMOUNT: String(initialSettings.DEPOSIT_AMOUNT),
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const res = await updateBusinessSettings({
      CASH_APP_HANDLE: formData.CASH_APP_HANDLE,
      ZELLE_HANDLE: formData.ZELLE_HANDLE,
      DEPOSIT_AMOUNT: formData.DEPOSIT_AMOUNT,
    });

    if (res.success) {
      setMessage({ type: "success", text: "Settings saved." });
      router.refresh();
    } else {
      setMessage({ type: "error", text: res.error || "Failed to save settings." });
    }
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-lowest rounded-[2rem] editorial-shadow p-6 md:p-8 space-y-6 max-w-xl">
      {message && (
        <div className={`p-4 rounded-xl text-sm font-medium ${
          message.type === "success" ? "bg-success-container text-on-success-container" : "bg-error-container text-on-error-container"
        }`}>
          {message.text}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold mb-2 ml-1">Cash App Handle</label>
        <input
          name="CASH_APP_HANDLE"
          value={formData.CASH_APP_HANDLE}
          onChange={handleChange}
          required
          className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
          placeholder="$yourcashtag"
          type="text"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 ml-1">Zelle Handle</label>
        <input
          name="ZELLE_HANDLE"
          value={formData.ZELLE_HANDLE}
          onChange={handleChange}
          required
          className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
          placeholder="Phone number or email"
          type="text"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2 ml-1">Deposit Amount (USD)</label>
        <input
          name="DEPOSIT_AMOUNT"
          value={formData.DEPOSIT_AMOUNT}
          onChange={handleChange}
          required
          min="1"
          step="1"
          className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 outline-none"
          placeholder="250"
          type="number"
        />
      </div>

      <button
        disabled={isSaving}
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary py-4 rounded-full font-bold editorial-shadow hover:opacity-90 transition-all active:scale-[0.98] disabled:opacity-70"
      >
        {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
        {isSaving ? "Saving..." : "Save Settings"}
      </button>
    </form>
  );
}
