import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendThankYouEmail(to: string) {
  return transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: "You're on the Healio waitlist 🎉",
    html: `
      <div style="font-family:sans-serif;line-height:1.6;">
        <h2>Thank you for joining Healio!</h2>
        <p>We’ll notify you as soon as we are live 🚀</p>
      </div>
    `,
  });
}
