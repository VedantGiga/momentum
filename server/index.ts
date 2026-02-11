import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

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

      log(logLine);
    }
  });

  next();
});

// Setup function to initialize the app
let setupPromise: Promise<void> | null = null;
export function setup() {
  if (!setupPromise) {
    setupPromise = (async () => {
      await registerRoutes(httpServer, app);

      app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
        const status = err.status || err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        if (res.headersSent) return next(err);
        res.status(status).json({ message });
      });

      if (process.env.NODE_ENV === "production" && !process.env.VERCEL) {
        serveStatic(app);
      } else if (process.env.NODE_ENV !== "production") {
        const { setupVite } = await import("./vite");
        await setupVite(httpServer, app);
      }
    })();
  }
  return setupPromise;
}

// Start server if main module
const __filename = fileURLToPath(import.meta.url);
const isMainModule = path.resolve(process.argv[1]) === path.resolve(__filename);

if (isMainModule) {
  setup().then(() => {
    const port = parseInt(process.env.PORT || "5000", 10);
    const listenOptions: any = { port, host: "0.0.0.0" };
    if (process.platform !== "win32") {
      listenOptions.reusePort = true;
    }

    httpServer.listen(listenOptions, () => {
      log(`serving on port ${port}`);
      log(`Pulse API active at /api/pulse`);
    });
  });
}

export default app;
