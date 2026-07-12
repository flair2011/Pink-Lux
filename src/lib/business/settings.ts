import { db } from "@/lib/firebase/admin";
import { BUSINESS_CONFIG, type PaymentSettings } from "@/config/business";

export async function getBusinessSettings(): Promise<PaymentSettings> {
  if (!db) return BUSINESS_CONFIG.PAYMENT;

  try {
    const doc = await db.collection("settings").doc("business").get();
    if (!doc.exists) return BUSINESS_CONFIG.PAYMENT;

    const data = doc.data() as Partial<PaymentSettings> | undefined;
    return {
      CASH_APP_HANDLE: data?.CASH_APP_HANDLE ?? BUSINESS_CONFIG.PAYMENT.CASH_APP_HANDLE,
      ZELLE_HANDLE: data?.ZELLE_HANDLE ?? BUSINESS_CONFIG.PAYMENT.ZELLE_HANDLE,
      DEPOSIT_AMOUNT: data?.DEPOSIT_AMOUNT ?? BUSINESS_CONFIG.PAYMENT.DEPOSIT_AMOUNT,
    };
  } catch (error: unknown) {
    console.error("Failed to load business settings, using defaults:", error);
    return BUSINESS_CONFIG.PAYMENT;
  }
}
