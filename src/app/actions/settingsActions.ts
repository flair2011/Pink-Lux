"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase/admin";
import { getVerifiedSession } from "@/lib/auth/session";

const paymentSettingsSchema = z.object({
  CASH_APP_HANDLE: z.string().min(1, "Cash App handle is required"),
  ZELLE_HANDLE: z.string().min(1, "Zelle handle is required"),
  DEPOSIT_AMOUNT: z.coerce.number().positive("Deposit amount must be positive"),
});

export async function updateBusinessSettings(data: unknown) {
  if (!db) return { success: false, error: "Firebase DB missing" };

  const session = await getVerifiedSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const validated = paymentSettingsSchema.parse(data);
    await db.collection("settings").doc("business").set(validated, { merge: true });
    revalidatePath("/");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to update business settings", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Please check your settings values." };
    }
    return { success: false, error: "Failed to save settings." };
  }
}
