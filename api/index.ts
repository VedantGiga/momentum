import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app, setupApp } from '../server/app';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers early to allow seeing errors in browser
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
        // Ensure the app is initialized
        await setupApp();

        // Pass request to Express app
        return app(req, res);
    } catch (err: any) {
        console.error("Server Initialization/Request Failed:", err);
        res.status(500).json({
            message: "Server encountered a critical error during startup or processing",
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
}
