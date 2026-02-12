import "dotenv/config";
import { db } from "../api/_lib/db.js";
import { applications } from "../shared/schema.js";
import { sql } from "drizzle-orm";

// Ensure env vars are loaded effectively
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing from environment. Please check .env file.");
    process.exit(1);
}

async function clearUsers() {
    console.log("Clearing all users (applications)...");
    try {
        await db.delete(applications);
        console.log("Successfully cleared all users.");
    } catch (error) {
        console.error("Error clearing users:", error);
    }
    process.exit(0);
}

clearUsers();
