# Deploying to Vercel

This guide outlines the steps to deploy your Express + Vite application to Vercel.

## Prerequisites

1.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
2.  **Vercel CLI**: Install globally via `npm i -g vercel` (optional, can also use Git integration).
3.  **PostgreSQL Database**: You need a hosted database.
    - **Recommended**: [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres), [Neon](https://neon.tech), or [Supabase](https://supabase.com).
    - Get your `DATABASE_URL` ready.

## Deployment Steps

### Method 1: Vercel CLI (Recommended for quick test)

1.  **Login to Vercel**:
    ```bash
    vercel login
    ```

2.  **Deploy**:
    Run the following command in your project root:
    ```bash
    vercel
    ```

3.  **Configuration**:
    - **Set up and deploy**: `Y`
    - **Which scope**: Select your account/team.
    - **Link to existing project**: `N`
    - **Project Name**: `builder-landing-page` (or your choice).
    - **In which directory is your code located?**: `./` (default).
    - **Want to modify these settings?**: `N` (Defaults should work, but see below if issues).

4.  **Environment Variables**:
    - Go to your Vercel Project Dashboard > Settings > Environment Variables.
    - Add `DATABASE_URL`: Your PostgreSQL connection string.
      - **Note**: If your provider gives you a "Prisma URL" (e.g. Supabase Transaction Mode, port 6543), you can use that. It is just a standard PostgreSQL connection string optimized for serverless.
      - Ensure it looks like `postgres://user:pass@host:port/db`.
    - Add `NODE_ENV`: `production`
    - Redeploy if necessary.

### Method 2: Git Integration (Recommended for production)

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Import the project in Vercel Dashboard.
3.  Vercel should automatically detect Vite.
4.  **IMPORTANT**: Override the **Output Directory** if necessary.
    - Vercel usually expects `dist`. Your project builds to `dist/public` (client assets).
    - If you see a 404 on the frontend, check the **Output Directory** setting. **Set it to `dist/public`**.
5.  Set Environment Variables in the dashboard.

## Database Migration

To set up your database schema on the new database:

1.  **Configure `.env` locally**: Ensure `DATABASE_URL` is set to your production DB for the command (or use the one in Vercel if you use Vercel CLI).
2.  **Run Migration**:
    ```bash
    npm run db:push
    ```
    This pushes the schema to the database defined in your environment.

## Verification


1.  **Frontend**: Visit the deployment URL. The landing page should load.
2.  **API**: Test the API, e.g., `/api/pulse`.
    - If it returns data, the API is working.
    - If it returns 500, check the Function Logs in Vercel Dashboard.

## Troubleshooting

- **500 Internal Server Error**: Check Vercel Function Logs.
    - "Application with this email already exists" -> Database constraint.
    - "messge: ..." -> Check your error handling.
- **404 Not Found (Frontend)**:
    - Ensure `vercel.json` rewrites are correct (already configured).
    - Ensure Output Directory is `dist/public` if Vercel doesn't auto-detect it correctly.
- **Database Connection Error**:
    - Verify `DATABASE_URL` is correct.
    - Ensure your database allows connections from Vercel/Anywhere (0.0.0.0/0) or configure Vercel IP allowlisting.
