import type { Express } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import fetch from "node-fetch";

import { sendThankYouEmail } from "./utils/mailer.ts";

// Define the schema for email subscription
const insertEmailSubscriptionSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Email subscription endpoint
  app.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);

      // 1. Save email into Google Sheets
      await fetch(process.env.SHEET_WEBHOOK_URL!, {
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

  const httpServer = createServer(app);
  return httpServer;
}
