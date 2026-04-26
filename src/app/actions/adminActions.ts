"use server";

import { db, auth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";
import * as admin from 'firebase-admin';

export async function createSession(idToken: string) {
  if (!auth) return { success: false, error: "Firebase Admin is not configured" };
  
  try {
    // 5 days
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    // Explicitly await cookies() conforming to Next 15 standard
    const cookieStore = await cookies();
    cookieStore.set("__session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return { success: true };
  } catch (error) {
    console.error("Session creation failed", error);
    return { success: false, error: "Unauthorized" };
  }
}

export async function verifyDeposit(documentId: string) {
  if (!db) return { success: false, error: "Firebase DB missing" };

  try {
    await db.collection("bookings").doc(documentId).update({
      status: "Deposit Verified",
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to update status", error);
    return { success: false, error: "Status update failed" };
  }
}
