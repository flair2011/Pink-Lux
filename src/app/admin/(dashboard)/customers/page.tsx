export const dynamic = "force-dynamic";

import { db } from "@/lib/firebase/admin";
import CustomerTable from "@/components/admin/CustomerTable";
import { getAllBookings } from "@/lib/admin/bookings";
import { aggregateCustomers } from "@/lib/admin/customers";

export default async function CustomersPage() {
  if (!db) {
    return (
      <div className="text-center p-12 bg-red-50 text-red-600 rounded-[2rem] border border-red-100">
        <h2 className="text-2xl font-bold mb-2">Firebase Connection Error</h2>
        <p>The system requires a valid <code>FIREBASE_SERVICE_ACCOUNT_BASE64</code> in `.env.local` to securely query and render the database entries directly at the server edge.</p>
      </div>
    );
  }

  const bookings = await getAllBookings();
  const customers = aggregateCustomers(bookings);

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-headline italic tracking-tight text-on-surface mb-2">Customers</h2>
        <p className="text-on-surface-variant text-sm md:text-base">Clients derived from booking history, grouped by email.</p>
      </div>

      <CustomerTable customers={customers} />
    </div>
  );
}
