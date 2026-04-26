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

export async function notifyOwnerOfNewBooking(clientName: string, referenceCode: string, requestedDate: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Email notification mocked.");
    return { success: true, mocked: true };
  }
  
  try {
    await resend.emails.send({
      from: 'Pink Lux Concierge <booking@pinkluxconcierge.com>',
      to: ['pinklux305@gmail.com'],
      subject: `🚨 NEW BOOKING REQUEST - ${clientName} (${referenceCode})`,
      html: `<div style="font-family: sans-serif; p-4;">
        <h2 style="color: #ff2a70;">New Lead Awaiting Deposit!</h2>
        <p><strong>${clientName}</strong> has just submitted a booking request for <strong>${requestedDate}</strong>.</p>
        <p>Their reference code is: <strong style="font-size: 1.2rem;">${referenceCode}</strong></p>
        <p>They have been prompted to pay via Cash App or Zelle. Keep an eye out for this reference code in your incoming payments!</p>
      </div>`
    });
    return { success: true, mocked: false };
  } catch (error) {
    console.error("Failed to send owner new booking email:", error);
    return { success: false, error: String(error) };
  }
}

export async function notifyUserOfPendingDeposit(userEmail: string, fullName: string, referenceCode: string) {
  if (!resend) {
    console.warn("RESEND_API_KEY is not set. Email notification mocked.");
    return { success: true, mocked: true };
  }
  
  try {
    await resend.emails.send({
      from: 'Pink Lux Concierge <booking@pinkluxconcierge.com>',
      to: [userEmail],
      subject: `Action Required: Secure Your Stay (Ref: ${referenceCode})`,
      html: `<div style="font-family: sans-serif; p-4;">
        <h2 style="color: #ff2a70;">We've received your request!</h2>
        <p>Hi ${fullName},</p>
        <p>Thank you for choosing Pink Lux Concierge! We have securely received your booking request.</p>
        <p>To verify and confirm your dates, a deposit is required. Please make your deposit using one of the methods below:</p>
        
        <div style="background-color: #f7f7f7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>IMPORTANT:</strong> You must include your reference code exactly as written in the memo/notes of your transfer.</p>
          <p style="font-size: 1.5rem; text-align: center; font-weight: bold; color: #ff2a70;">${referenceCode}</p>
        </div>

        <h3>Payment Methods</h3>
        <ul>
          <li><strong>Cash App:</strong> $Crown973</li>
          <li><strong>Zelle:</strong> 786-566-5508</li>
        </ul>

        <p>Once you make the deposit, our team will verify it and send your final confirmation.</p>
        <p>Warmly,<br/>Pink Lux Concierge</p>
      </div>`
    });
    return { success: true, mocked: false };
  } catch (error) {
    console.error("Failed to send user pending deposit email:", error);
    return { success: false, error: String(error) };
  }
}
