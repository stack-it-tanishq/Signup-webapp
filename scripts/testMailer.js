import nodemailer from "nodemailer";

async function main() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: "tanishq.invest@gmail.com",
    subject: "Zoho SMTP Test",
    text: "If you see this, Zoho SMTP works 🚀",
  });

  console.log("Message sent:", info.messageId);
}

main().catch(console.error);
