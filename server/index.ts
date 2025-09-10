import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
// CORS configuration (minimal, safe)
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow non-browser requests (curl, mobile)
    if (!origin) return callback(null, true);

    // canonical allowed origins (add more via ALLOWED_ORIGINS env, comma separated)
    const defaultAllowed = [
      'http://localhost:3000',   // dev
      'http://localhost:5173',   // vite dev
      'http://localhost:4000',   // local server
      process.env.CLIENT_URL || '', // e.g. http://localhost:5173 or https://healio.fit if set
      'https://healio.fit',
      'https://www.healio.fit'
    ].filter(Boolean);

    const extra = (process.env.ALLOWED_ORIGINS || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const allowedOrigins = defaultAllowed.concat(extra);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // If you want a wildcard under your domain (example: allow any subdomain of healio.fit)
    // you can use: if (origin.endsWith('.healio.fit')) return callback(null, true);
    console.warn(`Blocked request from origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  // keep 200 for legacy; modern browsers accept 204 as well
  optionsSuccessStatus: 200
};

// Use CORS middleware
app.use(cors(corsOptions));
// Ensure preflight OPTIONS requests are handled using the same CORS options
app.options('*', cors(corsOptions));


app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// When separating deployments, do NOT serve the client by default in production.
// If you want the backend to also serve the built client, set SERVE_CLIENT=true.
const shouldServeClient = process.env.SERVE_CLIENT === 'true';
if (app.get('env') === 'production' && shouldServeClient) {
  // Only if explicitly enabled, fall back to serving the client
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.includes('.')) {
      return next();
    }
    res.sendFile(path.join(process.cwd(), 'dist/public/index.html'));
  });
}

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err?.status || err?.statusCode || 500;
    const message = err?.message || "Internal Server Error";
  
    // respond to client
    res.status(status).json({ message });
  
    // log server-side (do NOT re-throw; re-throwing after response can cause crashes / 500s)
    console.error('Unhandled error:', { status, message, stack: err?.stack });
  
    // do not call next(err) or throw — we've already responded
  });
  

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else if (shouldServeClient) {
    // only serve static when explicitly enabled
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Default to 4000 if not specified.
  // This serves both the API and the client.
  const port = parseInt(process.env.PORT || '4000', 10);
  // Try binding to all network interfaces
  server.listen(port, () => {
    log(`serving on port ${port}`);
  });
})();
