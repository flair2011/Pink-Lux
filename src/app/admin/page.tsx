import { db } from "@/lib/firebase/admin";
import AdminTable from "@/components/AdminTable";

export default async function AdminDashboard() {
  if (!db) {
    return (
      <div className="text-center p-12 bg-red-50 text-red-600 rounded-[2rem] border border-red-100">
        <h2 className="text-2xl font-bold mb-2">Firebase Connection Error</h2>
        <p>The system requires a valid <code>FIREBASE_SERVICE_ACCOUNT_BASE64</code> in `.env.local` to securely query and render the database entries directly at the server edge.</p>
      </div>
    );
  }

  // Fetch bookings from Firestore, parsing server timestamps down sequentially for client consumption.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let bookings: any[] = [];
  try {
    const snapshot = await db.collection("bookings")
        .orderBy("createdAt", "desc")
        .get();
        
    // eslint-disable-next-line react-hooks/purity
    bookings = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt ? data.createdAt.toDate().getTime() : Date.now(),
        updatedAt: data.updatedAt ? data.updatedAt.toDate().getTime() : null,
      };
    });
  } catch (error) {
    console.error("Failed fetching bookings:", error);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-3xl font-headline italic tracking-tight text-on-surface mb-2">Active Requests</h2>
           <p className="text-on-surface-variant">Manage incoming bookings and track monetary deposits.</p>
        </div>
      </div>
      
      <AdminTable bookings={bookings} />
    </div>
  );
}
