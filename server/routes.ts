import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import fetch from "node-fetch";

import { sendThankYouEmail, sendContactNotificationEmail } from "./utils/mailer.ts";

// Define the schema for email subscription
const insertEmailSubscriptionSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().optional(),
});

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);

      // 1. Save email into Google Sheets
      await fetch(process.env.WAITLIST_SHEET_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: validatedData.email, name: validatedData.name }),
      });

      // 2. Send thank-you email
      await sendThankYouEmail(validatedData.email);

      // Respond back to client
      res.status(201).json({
        message: "Successfully subscribed",
        email: validatedData.email,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid email format",
          errors: error.errors,
        });
      }

      console.error("Email subscription error:", error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  });

  app.post("/contact", async (req, res) => {
    try {
      const data = contactSchema.parse(req.body);
  
      // 1) Post to Google Sheet webhook (no DB)
      const sheetResp = await fetch(process.env.CONTACT_SHEET_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });
  
      // optional: check sheetResp status
      if (!sheetResp.ok) {
        console.warn("Google Sheet webhook returned non-OK:", await sheetResp.text());
      }
  
      // 2) Send internal notification email to your support inbox
      // This helps you triage without opening the sheet
      await sendContactNotificationEmail({
        name: data.name,
        email: data.email,
        message: data.message,
      });
  
      return res.status(201).json({ ok: true, message: "Message received" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ ok: false, errors: err.errors });
      }
      console.error("Contact route error:", err);
      return res.status(500).json({ ok: false, error: "Internal server error" });
    }
  });
  

  const httpServer = createServer(app);
  return httpServer;
}
