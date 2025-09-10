// server/index.ts
import express2 from "express";
import cors from "cors";

// server/routes.ts
import { createServer } from "http";
import { z } from "zod";
import fetch from "node-fetch";

// server/utils/mailer.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
var transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});
async function sendThankYouEmail(to) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to,
    subject: "You're on the Healio waitlist \u{1F389}",
    html: `<div style="font-family:sans-serif;line-height:1.6;">
        <h2>Thank you for joining Healio!</h2>
        <p>We\u2019ll notify you as soon as we are live \u{1F680}</p>
      </div>`
  });
}
async function sendContactNotificationEmail(payload) {
  const subject = `New contact message from ${payload.name} <${payload.email}>`;
  const html = `
    <div style="font-family: sans-serif; line-height:1.5;">
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>\u2014 Healio</p>
    </div>
  `;
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_USER,
    subject,
    html
  });
}
function escapeHtml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// server/routes.ts
var insertEmailSubscriptionSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().optional()
});
var contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required")
});
async function registerRoutes(app2) {
  app2.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      await fetch(process.env.WAITLIST_SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: validatedData.email, name: validatedData.name })
      });
      await sendThankYouEmail(validatedData.email);
      res.status(201).json({
        message: "Successfully subscribed",
        email: validatedData.email
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid email format",
          errors: error.errors
        });
      }
      console.error("Email subscription error:", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });
  app2.post("/contact", async (req, res) => {
    try {
      const data = contactSchema.parse(req.body);
      const sheetResp = await fetch(process.env.CONTACT_SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message
        })
      });
      if (!sheetResp.ok) {
        console.warn("Google Sheet webhook returned non-OK:", await sheetResp.text());
      }
      await sendContactNotificationEmail({
        name: data.name,
        email: data.email,
        message: data.message
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    root: resolve(__dirname, "client"),
    // make root absolute
    resolve: {
      alias: {
        "@": resolve(__dirname, "client", "src"),
        "@shared": resolve(__dirname, "shared"),
        "@assets": resolve(__dirname, "attached_assets")
      }
    },
    build: {
      outDir: resolve(__dirname, "dist", "public"),
      emptyOutDir: true
    },
    server: {
      fs: {
        strict: true
      },
      // Only configure proxy in development
      ...command === "serve" ? {
        proxy: {
          "/api": {
            target: env.VITE_API_URL || "http://localhost:4000",
            changeOrigin: true,
            secure: false,
            rewrite: (path3) => path3.replace(/^\/api/, "")
          }
        }
      } : {}
    },
    // In production, rewrite API paths to the production URL
    ...command === "build" ? {
      base: "",
      define: {
        "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL || "")
      }
    } : {}
  };
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
        process.cwd(),
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// server/index.ts
import path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path2.dirname(__filename2);
var app = express2();
var corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowedOrigins = [
      "http://localhost:3000",
      // Default Vite dev server
      "http://localhost:4000",
      // Current server port
      ...process.env.ALLOWED_ORIGINS?.split(",").map((s) => s.trim()).filter(Boolean) || []
    ];
    if (process.env.NODE_ENV !== "production" || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
  // Some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
var shouldServeClient = process.env.SERVE_CLIENT === "true";
if (app.get("env") === "production" && shouldServeClient) {
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api") || req.path.includes(".")) {
      return next();
    }
    res.sendFile(path2.join(process.cwd(), "dist/public/index.html"));
  });
}
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else if (shouldServeClient) {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "4000", 10);
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
