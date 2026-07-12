"use server";

import { db, auth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as admin from 'firebase-admin';
import { notifyUserOfVerification } from "@/app/actions/emailActions";
import { getVerifiedSession } from "@/lib/auth/session";

export async function createSession(idToken: string, remember: boolean) {
  if (!auth) return { success: false, error: "Firebase Admin is not configured" };

  try {
    // 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    // Explicitly await cookies() conforming to Next 15 standard
    const cookieStore = await cookies();
    cookieStore.set("__session", sessionCookie, {
      // Omitting maxAge when "remember me" is unchecked makes it a session
      // cookie, cleared when the browser closes, even though the underlying
      // token itself stays valid for the full 5 days.
      ...(remember ? { maxAge: expiresIn / 1000 } : {}),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return { success: true };
  } catch (error: unknown) {
    console.error("Session creation failed", error);
    return { success: false, error: "Unauthorized" };
  }
}

export async function logoutAction() {
  (await cookies()).delete("__session");
  redirect("/admin/login");
}

export async function verifyDeposit(documentId: string) {
  if (!db) return { success: false, error: "Firebase DB missing" };

  const session = await getVerifiedSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const bookingRef = db.collection("bookings").doc(documentId);
    const bookingDoc = await bookingRef.get();

    if (!bookingDoc.exists) {
      return { success: false, error: "Booking not found" };
    }

    const data = bookingDoc.data();

    await bookingRef.update({
      status: "Deposit Verified",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    if (data?.clientInfo?.email && data?.referenceCode) {
      await notifyUserOfVerification(
        data.clientInfo.email,
        data.clientInfo.fullName || 'Guest',
        data.referenceCode
      );
    }

    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to update status", error);
    return { success: false, error: "Status update failed" };
  }
}
