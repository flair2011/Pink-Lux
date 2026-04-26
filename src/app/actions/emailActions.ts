"use server";

import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function notifyOwnerOfDeposit(referenceCode: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set in .env.local. Email notification mocked.");
    console.log(`Mock Email -> To: Owner, Subject: Deposit Claimed for ${referenceCode}`);
    return { success: true, mocked: true };
  }

  try {
    await resend.emails.send({
      from: 'Pink Lux Concierge <booking@pinkluxconcierge.com>',
      to: ['pinklux305@gmail.com'],
      subject: `Deposit Made - Check for ${referenceCode}`,
      html: `<div style="font-family: sans-serif; p-4;">
        <h2 style="color: #ff2a70;">Deposit Claimed</h2>
        <p>A customer has indicated they made a deposit for booking reference <strong>${referenceCode}</strong>.</p>
        <p>Please log into your Cash App or Zelle to confirm receipt of funds. If received, you can verify it in the Admin Dashboard.</p>
      </div>`
    });

    return { success: true, mocked: false };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { success: false, error: String(error) };
  }
}

export async function notifyUserOfVerification(userEmail: string, fullName: string, referenceCode: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Email notification mocked.");
    return { success: true, mocked: true };
  }

  try {
    await resend.emails.send({
      from: 'Pink Lux Concierge <booking@pinkluxconcierge.com>',
      to: [userEmail],
      subject: `Deposit Confirmed - Booking ${referenceCode}`,
      html: `<div style="font-family: sans-serif; p-4;">
        <h2 style="color: #ff2a70;">Deposit Confirmed!</h2>
        <p>Hi ${fullName},</p>
        <p>Great news! We have securely verified your deposit and your booking (Ref: <strong>${referenceCode}</strong>) is now officially confirmed.</p>
        <p>Our team will be in touch shortly with your pre-arrival information and next steps.</p>
        <p>Warmly,<br/>Pink Lux Concierge</p>
      </div>`
    });

    return { success: true, mocked: false };
  } catch (error) {
    console.error("Failed to send verification email via Resend:", error);
    return { success: false, error: String(error) };
  }
}
