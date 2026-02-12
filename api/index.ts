import type { VercelRequest, VercelResponse } from '@vercel/node';

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
        console.log("[API] Handler started. Dynamically importing server/app...");

        // Dynamic import to catch initialization errors
        const { app, setupApp } = await import('../server/app');

        console.log("[API] Server module imported. Calling setupApp...");
        await setupApp();

        console.log("[API] setupApp completed. Passing to Express...");
        return app(req, res);
    } catch (err: any) {
        console.error("Server Initialization/Import Failed:", err);
        res.status(500).json({
            message: "Server encountered a critical error during loading",
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
}
