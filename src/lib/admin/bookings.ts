import { db } from "@/lib/firebase/admin";
import type { Booking } from "@/lib/schema/booking";

export async function getAllBookings(): Promise<Booking[]> {
  if (!db) return [];

  try {
    const snapshot = await db.collection("bookings")
        .orderBy("createdAt", "desc")
        .get();
    // Falls back to the fetch time when a doc's serverTimestamp() hasn't committed yet.
    const fetchedAt = Date.now();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().getTime() : fetchedAt,
        updatedAt: data.updatedAt ? data.updatedAt.toDate().getTime() : null,
      } as Booking;
    });
  } catch (error: unknown) {
    console.error("Failed fetching bookings:", error);
    return [];
  }
}
