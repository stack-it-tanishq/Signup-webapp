// src/utils/mailer.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

export async function sendThankYouEmail(to: string): Promise<void> {
  await transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to,
    subject: "You're on the Healio waitlist 🎉",
    html: `<div style="font-family:sans-serif;line-height:1.6;">
        <h2>Thank you for joining Healio!</h2>
        <p>We’ll notify you as soon as we are live 🚀</p>
      </div>`,
  });
}

export type ContactPayload = { name: string; email: string; message: string };

export async function sendContactNotificationEmail(payload: ContactPayload): Promise<void> {
  const subject = `New contact message from ${payload.name} <${payload.email}>`;
  const html = `
    <div style="font-family: sans-serif; line-height:1.5;">
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>— Healio</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM!,
    to: process.env.SMTP_USER!, 
    subject,
    html,
  });
}

// tiny helper to avoid injection in email body
function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
