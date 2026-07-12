export const dynamic = "force-dynamic";

import { db } from "@/lib/firebase/admin";
import KpiTile from "@/components/admin/KpiTile";
import RecentBookingsList from "@/components/admin/RecentBookingsList";
import { computeBookingStats } from "@/lib/admin/stats";
import { getAllBookings } from "@/lib/admin/bookings";
import { getBusinessSettings } from "@/lib/business/settings";
import { Users, Clock, CheckCircle, CalendarDays } from "lucide-react";

export default async function AdminDashboard() {
  if (!db) {
    return (
      <div className="text-center p-12 bg-red-50 text-red-600 rounded-[2rem] border border-red-100">
        <h2 className="text-2xl font-bold mb-2">Firebase Connection Error</h2>
        <p>The system requires a valid <code>FIREBASE_SERVICE_ACCOUNT_BASE64</code> in `.env.local` to securely query and render the database entries directly at the server edge.</p>
      </div>
    );
  }

  const [bookings, paymentSettings] = await Promise.all([
    getAllBookings(),
    getBusinessSettings(),
  ]);

  const stats = computeBookingStats(bookings, paymentSettings.DEPOSIT_AMOUNT);

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-2xl md:text-3xl font-headline italic tracking-tight text-on-surface mb-2">Dashboard</h2>
           <p className="text-on-surface-variant text-sm md:text-base">Overview of incoming bookings and monetary deposits.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <KpiTile label="Total Bookings" value={stats.total} icon={Users} />
        <KpiTile label="Pending Deposits" value={stats.pending} icon={Clock} />
        <KpiTile
          label="Verified Deposits"
          value={stats.verified}
          sublabel={`$${stats.revenue.toLocaleString()} est. revenue`}
          icon={CheckCircle}
        />
        <KpiTile label="This Month" value={stats.thisMonth} icon={CalendarDays} />
      </div>

      <RecentBookingsList bookings={bookings.slice(0, 5)} />
    </div>
  );
}
