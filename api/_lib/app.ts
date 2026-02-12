import express from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes.js";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware
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
            console.log(logLine);
        }
    });

    next();
});

// Setup function
let setupPromise: Promise<void> | null = null;
export async function setupApp() {
    if (!setupPromise) {
        setupPromise = (async () => {
            console.log("[Server] Registering routes...");
            await registerRoutes(httpServer, app);
            console.log("[Server] Routes registered.");
            // Error handling middleware
            app.use((err: any, _req: any, res: any, _next: any) => {
                const status = err.status || err.statusCode || 500;
                const message = err.message || "Internal Server Error";
                if (res.headersSent) return;
                res.status(status).json({ message });
            });
        })();
    }
    return setupPromise;
}

export { app, httpServer };
