# Momentum - Builders Execution Community Landing Page

## Overview

Momentum is a premium landing page for a builders execution community. It's a single-page application with a dark, cinematic design aesthetic (deep charcoal backgrounds, electric amber accents, atmospheric gradients). The site features a hero section, project activity feed, and an application form for prospective members. The core message is about consistent project shipping rather than motivation or networking.

The stack is a full-stack TypeScript monorepo: React frontend with Vite, Express backend, PostgreSQL database with Drizzle ORM, and shadcn/ui component library.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Monorepo Structure
- `client/` — React SPA (Vite bundled)
- `server/` — Express API server
- `shared/` — Shared types, schemas, and route definitions used by both client and server
- `migrations/` — Drizzle database migrations
- `attached_assets/` — Design briefs and reference materials

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite with HMR in development, static file serving in production
- **Routing**: Wouter (lightweight client-side router)
- **Styling**: Tailwind CSS with CSS variables for theming, dark-mode-only design
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives
- **Animations**: Framer Motion for scroll-triggered animations and transitions
- **Smooth Scrolling**: Lenis library for smooth scroll behavior
- **Data Fetching**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation (via @hookform/resolvers)
- **Fonts**: Inter (body), Space Grotesk (display headings), JetBrains Mono (monospace accents)
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript, executed via tsx in development
- **API Pattern**: RESTful JSON API under `/api/` prefix
- **Route Definitions**: Centralized in `shared/routes.ts` — both client and server reference the same route objects (paths, methods, input/output schemas)
- **Validation**: Zod schemas generated from Drizzle table definitions via drizzle-zod
- **Build**: esbuild bundles server to `dist/index.cjs` for production; Vite builds client to `dist/public/`

### Database
- **Database**: PostgreSQL (required, connection via `DATABASE_URL` env var)
- **ORM**: Drizzle ORM with `drizzle-orm/node-postgres` driver
- **Schema Location**: `shared/schema.ts`
- **Schema Push**: `npm run db:push` uses drizzle-kit to push schema changes
- **Tables**:
  - `projects` — id, title, description, author, status, date
  - `applications` — id, name, email, portfolio_url, reason, created_at
- **Seeding**: Server auto-seeds sample projects on startup if the projects table is empty

### API Endpoints
- `GET /api/projects` — Returns all projects for the activity feed
- `POST /api/applications` — Creates a new membership application (validated with Zod)

### Development vs Production
- **Dev**: Vite dev server runs as middleware on the Express server with HMR via WebSocket at `/vite-hmr`
- **Prod**: Client built to static files, served by Express static middleware with SPA fallback

### Key Design Decisions
- **Shared route contracts**: The `shared/routes.ts` file defines API routes with their paths, methods, and Zod schemas. Both frontend hooks and backend handlers use these definitions, ensuring type safety across the stack.
- **No authentication**: This is a public landing page with an application form — no user auth system.
- **Dark theme only**: The design is intentionally dark-only with a specific premium aesthetic (no light mode toggle).
- **Sharp corners**: Border radius is set to `0rem` by default for a brutalist/premium feel.

## External Dependencies

### Required Services
- **PostgreSQL Database**: Required. Connection string must be provided via `DATABASE_URL` environment variable. Uses `pg` (node-postgres) driver with connection pooling.

### Key NPM Packages
- `drizzle-orm` + `drizzle-kit` — Database ORM and migration tooling
- `express` v5 — HTTP server
- `@tanstack/react-query` — Async state management
- `framer-motion` — Animation library
- `lenis` — Smooth scroll library
- `wouter` — Client-side routing
- `zod` + `drizzle-zod` — Schema validation
- `react-hook-form` — Form management
- `date-fns` — Date formatting
- `shadcn/ui` components (via Radix UI primitives)
- `connect-pg-simple` — PostgreSQL session store (available but not currently used)

### Replit-Specific Plugins
- `@replit/vite-plugin-runtime-error-modal` — Shows runtime errors in overlay
- `@replit/vite-plugin-cartographer` — Dev-only cartographer integration
- `@replit/vite-plugin-dev-banner` — Dev-only banner