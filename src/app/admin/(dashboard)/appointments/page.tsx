export const dynamic = "force-dynamic";

import { db } from "@/lib/firebase/admin";
import AdminTable from "@/components/AdminTable";
import { getAllBookings } from "@/lib/admin/bookings";

export default async function AppointmentsPage() {
  if (!db) {
    return (
      <div className="text-center p-12 bg-red-50 text-red-600 rounded-[2rem] border border-red-100">
        <h2 className="text-2xl font-bold mb-2">Firebase Connection Error</h2>
        <p>The system requires a valid <code>FIREBASE_SERVICE_ACCOUNT_BASE64</code> in `.env.local` to securely query and render the database entries directly at the server edge.</p>
      </div>
    );
  }

  const bookings = await getAllBookings();

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-headline italic tracking-tight text-on-surface mb-2">Appointments</h2>
        <p className="text-on-surface-variant text-sm md:text-base">Manage incoming bookings and track monetary deposits.</p>
      </div>

      <AdminTable bookings={bookings} />
    </div>
  );
}
