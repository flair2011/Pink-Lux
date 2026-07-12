import type { Booking } from "@/lib/schema/booking";

export type Customer = {
  email: string;
  fullName: string;
  phone: string;
  bookingCount: number;
  verifiedCount: number;
  lastBookingAt: number;
  bookings: Booking[];
};

export function aggregateCustomers(bookings: Booking[]): Customer[] {
  const byEmail = new Map<string, Booking[]>();

  for (const booking of bookings) {
    const key = booking.clientInfo.email.trim().toLowerCase();
    const group = byEmail.get(key);
    if (group) {
      group.push(booking);
    } else {
      byEmail.set(key, [booking]);
    }
  }

  const customers: Customer[] = [];
  for (const [email, group] of byEmail) {
    const sorted = [...group].sort((a, b) => b.createdAt - a.createdAt);
    const mostRecent = sorted[0];
    customers.push({
      email,
      fullName: mostRecent.clientInfo.fullName,
      phone: mostRecent.clientInfo.phone,
      bookingCount: sorted.length,
      verifiedCount: sorted.filter((b) => b.status === "Deposit Verified").length,
      lastBookingAt: mostRecent.createdAt,
      bookings: sorted,
    });
  }

  return customers.sort((a, b) => b.lastBookingAt - a.lastBookingAt);
}
