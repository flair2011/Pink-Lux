"use server";

import { db } from "@/lib/firebase/admin";
import { bookingFormSchema, BookingFormData } from "@/lib/schema/booking";
import * as admin from 'firebase-admin';
import { notifyOwnerOfNewBooking, notifyUserOfPendingDeposit } from "@/app/actions/emailActions";

export async function createBooking(data: BookingFormData) {
  if (!db) {
    return { 
      success: false, 
      error: "Database not configured. Admin needs to set FIREBASE_SERVICE_ACCOUNT_BASE64 in the environment." 
    };
  }

  try {
    // 1. Zod Validation
    const validatedData = bookingFormSchema.parse(data);

    // 2. Generate a unique short reference Code
    const nanoidLike = Math.random().toString(36).substring(2, 6).toUpperCase();
    const referenceCode = `PL-${nanoidLike}`;

    // 3. Prepare the Firestore document
    const newDoc = {
      referenceCode,
      status: "Pending Deposit",
      clientInfo: validatedData.clientInfo,
      medicalInfo: validatedData.medicalInfo,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // 4. Write securely to Firestore using Admin SDK
    await db.collection("bookings").add(newDoc);

    // 5. Send Notification Emails
    await Promise.all([
      notifyOwnerOfNewBooking(
        validatedData.clientInfo.fullName,
        referenceCode,
        validatedData.medicalInfo.surgeryDate
      ),
      notifyUserOfPendingDeposit(
        validatedData.clientInfo.email,
        validatedData.clientInfo.fullName,
        referenceCode
      )
    ]);

    return { success: true, referenceCode };
  } catch (error: any) {
    console.error("Booking generation failed:", error);
    
    // Check if it's a Zod validation error
    if (error.errors && Array.isArray(error.errors)) {
       return { success: false, error: "Validation failed. Please check your inputs." };
    }

    return { success: false, error: error.message || "Something went wrong creating the booking" };
  }
}
