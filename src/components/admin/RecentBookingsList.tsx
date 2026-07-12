import Link from "next/link";
import type { Booking } from "@/lib/schema/booking";
import VerifyDepositButton from "@/components/admin/VerifyDepositButton";

export default function RecentBookingsList({ bookings }: { bookings: Booking[] }) {
  return (
    <div className="bg-surface-container-lowest rounded-[2rem] editorial-shadow overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-outline-variant/20">
        <h3 className="font-bold text-sm tracking-wider text-primary uppercase">Recent Requests</h3>
        <Link href="/admin/appointments" className="text-sm font-semibold text-primary hover:underline">
          View all
        </Link>
      </div>

      {!bookings.length ? (
        <div className="p-12 text-center text-on-surface-variant italic">No booking requests yet.</div>
      ) : (
        <>
          {/* Header */}
          <div className="hidden md:grid grid-cols-5 px-6 py-4 bg-surface-container-low border-b border-outline-variant/20 font-bold text-sm tracking-wider text-primary">
            <div>Reference</div>
            <div>Client</div>
            <div>Date</div>
            <div>Status</div>
            <div className="text-right">Action</div>
          </div>

          <div className="divide-y divide-outline-variant/10">
            {bookings.map((b) => {
              const isVerified = b.status === "Deposit Verified";
              return (
                <div key={b.id} className="p-5 flex flex-col md:grid md:grid-cols-5 gap-3 md:gap-0 md:items-center">
                  <div className="flex items-center justify-between md:block">
                    <span className="font-mono text-primary font-bold">{b.referenceCode}</span>
                  </div>
                  <div className="font-medium truncate">{b.clientInfo.fullName}</div>
                  <div className="text-sm text-on-surface-variant">{new Date(b.createdAt).toLocaleDateString()}</div>
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      isVerified ? "bg-success-container text-on-success-container" : "bg-warning-container text-on-warning-container"
                    }`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="w-full md:w-auto flex md:justify-end">
                    {!isVerified && <VerifyDepositButton bookingId={b.id} />}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
