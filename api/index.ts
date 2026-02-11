import type { VercelRequest, VercelResponse } from '@vercel/node';
import app, { setup } from '../server/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Ensure the app is initialized (routes registered, etc.)
    await setup();

    // Set CORS headers
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

    // Pass request to Express app
    return app(req, res);
}
