"use server";

import { z } from "zod";
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
      serviceType: validatedData.serviceType,
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
        validatedData.medicalInfo.surgeryDate,
        validatedData.serviceType,
        validatedData.medicalInfo.serviceAddress
      ),
      notifyUserOfPendingDeposit(
        validatedData.clientInfo.email,
        validatedData.clientInfo.fullName,
        referenceCode,
        validatedData.serviceType
      )
    ]);

    return { success: true, referenceCode };
  } catch (error: unknown) {
    console.error("Booking generation failed:", error);

    if (error instanceof z.ZodError) {
       return { success: false, error: "Validation failed. Please check your inputs." };
    }

    return { success: false, error: error instanceof Error ? error.message : "Something went wrong creating the booking" };
  }
}
