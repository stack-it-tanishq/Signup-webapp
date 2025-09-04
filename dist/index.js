var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/db.ts
import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  emailSubscriptions: () => emailSubscriptions,
  insertEmailSubscriptionSchema: () => insertEmailSubscriptionSchema
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var emailSubscriptions = pgTable("email_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  verificationToken: varchar("verification_token").unique(),
  verifiedAt: timestamp("verified_at"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertEmailSubscriptionSchema = createInsertSchema(emailSubscriptions).pick({
  email: true,
  name: true
});

// server/db.ts
dotenv.config({ path: ".env" });
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}
var pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});
var db = drizzle(pool, { schema: schema_exports });

// server/pg-storage.ts
import { and, eq, isNull } from "drizzle-orm";
import { randomBytes } from "crypto";
var PostgresStorage = class {
  /**
   * Inserts a new subscriber with a verification token
   */
  async insertSubscriber(email, name) {
    const verificationToken = this.generateVerificationToken();
    const [subscription] = await db.insert(emailSubscriptions).values({
      email,
      name,
      status: "pending",
      verificationToken,
      verifiedAt: null,
      createdAt: /* @__PURE__ */ new Date()
    }).onConflictDoUpdate({
      target: emailSubscriptions.email,
      set: {
        name,
        status: "pending",
        verificationToken,
        verifiedAt: null
      }
    }).returning();
    return subscription;
  }
  /**
   * Finds a subscriber by their verification token
   */
  async findByToken(verificationToken) {
    const [subscription] = await db.select().from(emailSubscriptions).where(
      and(
        eq(emailSubscriptions.verificationToken, verificationToken),
        isNull(emailSubscriptions.verifiedAt)
      )
    ).limit(1);
    return subscription;
  }
  /**
   * Verifies a subscriber using their verification token
   */
  async verifySubscriber(verificationToken) {
    const [subscription] = await db.update(emailSubscriptions).set({
      status: "verified",
      verifiedAt: /* @__PURE__ */ new Date(),
      verificationToken: null
    }).where(
      and(
        eq(emailSubscriptions.verificationToken, verificationToken),
        isNull(emailSubscriptions.verifiedAt)
      )
    ).returning();
    return subscription;
  }
  /**
   * Helper method to generate a secure verification token
   */
  generateVerificationToken() {
    return randomBytes(32).toString("hex");
  }
  // Keeping these methods for backward compatibility
  async createEmailSubscription(subscription) {
    return this.insertSubscriber(subscription.email, subscription.name || void 0);
  }
  async getEmailSubscriptionByEmail(email) {
    const [subscription] = await db.select().from(emailSubscriptions).where(eq(emailSubscriptions.email, email)).limit(1);
    return subscription;
  }
};
var pgStorage = new PostgresStorage();

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/subscribe", async (req, res) => {
    try {
      const validatedData = insertEmailSubscriptionSchema.parse(req.body);
      const existingSubscription = await pgStorage.getEmailSubscriptionByEmail(validatedData.email);
      if (existingSubscription) {
        return res.status(409).json({
          message: "Email already subscribed"
        });
      }
      const subscription = await pgStorage.createEmailSubscription(validatedData);
      res.status(201).json({
        message: "Successfully subscribed",
        email: subscription.email
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "client/src"),
      "@shared": resolve(__dirname, "shared"),
      "@assets": resolve(__dirname, "attached_assets")
    }
  },
  root: "./client",
  build: {
    outDir: "../dist/public",
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true
    }
  }
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
  const distPath = path.resolve(import.meta.dirname, "public");
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
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path2 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path2.startsWith("/api")) {
      let logLine = `${req.method} ${path2} ${res.statusCode} in ${duration}ms`;
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
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "3000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
