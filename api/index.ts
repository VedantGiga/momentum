import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app, setupApp } from './_lib/app';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers early
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        console.log("[API] Handler started");

        // Setup routes if not done
        await setupApp();

        // Pass to Express
        app(req, res);
    } catch (err: any) {
        console.error("Server Request Failed:", err);
        res.status(500).json({
            message: "Server encountered a critical error",
            error: err.message
        });
    }
}
