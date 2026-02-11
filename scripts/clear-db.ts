
import "dotenv/config";
import { db } from "../server/db";
import { applications } from "../shared/schema";
import { sql } from "drizzle-orm";

async function clearDb() {
    try {
        console.log("Clearing applications table...");
        await db.delete(applications);
        console.log("Successfully cleared all applications.");
        process.exit(0);
    } catch (error) {
        console.error("Error clearing database:", error);
        process.exit(1);
    }
}

clearDb();
