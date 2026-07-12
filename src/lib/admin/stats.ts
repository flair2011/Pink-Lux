import type { Booking } from "@/lib/schema/booking";

export function computeBookingStats(bookings: Booking[], depositAmount: number, now: Date = new Date()) {
  const total = bookings.length;
  const verified = bookings.filter((b) => b.status === "Deposit Verified").length;
  const pending = total - verified;
  const revenue = verified * depositAmount;
  const thisMonth = bookings.filter((b) => {
    const d = new Date(b.createdAt);
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  return { total, pending, verified, revenue, thisMonth };
}
