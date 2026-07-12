import { cookies } from "next/headers";
import * as admin from "firebase-admin";
import { auth } from "@/lib/firebase/admin";

export async function getVerifiedSession(): Promise<admin.auth.DecodedIdToken | null> {
  if (!auth) return null;

  const sessionCookie = (await cookies()).get("__session")?.value;
  if (!sessionCookie) return null;

  try {
    return await auth.verifySessionCookie(sessionCookie, true);
  } catch {
    return null;
  }
}
