import * as esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["server/index.ts"],
    bundle: true,
    platform: "node",
    target: "node20",
    format: "esm",
    outdir: "dist",
    external: ["pg", "drizzle-orm", "express", "ws", "vite", "nodemailer", "zod", "framer-motion", "lucide-react", "react", "react-dom", "wouter", "dotenv", "connect-pg-simple", "express-session", "passport", "passport-local", "memorystore"],
});
console.log("Server build complete");
