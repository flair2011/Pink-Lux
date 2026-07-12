export const dynamic = "force-dynamic";

import SettingsForm from "@/components/admin/SettingsForm";
import { getBusinessSettings } from "@/lib/business/settings";

export default async function SettingsPage() {
  const settings = await getBusinessSettings();

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-headline italic tracking-tight text-on-surface mb-2">Settings</h2>
        <p className="text-on-surface-variant text-sm md:text-base">Payment details shown to customers on the booking form and in confirmation emails.</p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  );
}
