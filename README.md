# Valley Health and Counseling

ValleyHC is a standalone marketing website for a behavioral health clinic. It is built with Next.js 14, TypeScript, Tailwind CSS, reusable shadcn-style UI primitives, Resend-backed contact/referral submission flows, and a protected internal dashboard powered by Supabase Auth + Supabase lead data.

## Goals

- Clean, professional behavioral health marketing site
- Lead generation and referral-friendly UX
- Protected internal operations dashboard for lead review
- Mobile-first responsive design
- Contact-only forms with no PHI storage
- Build-ready structure for future VEHR integration
- Vercel-friendly deployment path with domain-ready metadata and SEO primitives
- Azure Static Web Apps-ready hybrid deployment path for the public site and App Router form endpoints

## Project structure

```text
src/
  app/
    page.tsx
    services/page.tsx
    about/page.tsx
    contact/page.tsx
    referrals/page.tsx
    insurance/page.tsx
  components/
    layout/
    sections/
    ui/
  lib/
  styles/
public/
```

## Key pages

- `/` - homepage with hero, services preview, value props, how-it-works, placeholder testimonials, and final CTA
- `/services` - detailed service descriptions and care model
- `/about` - mission, clinic overview, and team placeholders
- `/contact` - non-sensitive contact request form
- `/referrals` - non-sensitive referral form using patient initials only
- `/insurance` - benefits and verification guidance
- `/dashboard` - protected lead operations dashboard backed by Supabase
- `/login` - Supabase Auth admin sign-in
- `/set-password` - first-login password setup flow for invited admins

## Tech stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Lucide icons
- React Hook Form
- Zod
- Resend
- Supabase
- `@supabase/ssr`
- `clsx`, `class-variance-authority`, and `tailwind-merge`

## Environment variables

Create `.env.local`:

```bash
RESEND_API_KEY=
CONTACT_EMAIL=your-email@example.com
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

- `RESEND_API_KEY` is your Resend API key
- `CONTACT_EMAIL` is the inbox that should receive website contact and referral emails
- `SUPABASE_URL` is your Supabase project URL
- `SUPABASE_ANON_KEY` is the client-safe Supabase publishable/anon key used for browser auth and server session validation
- `SUPABASE_SERVICE_ROLE_KEY` is required only on the server for the admin invite script
- All values are sourced from `process.env`
- Do not use `NEXT_PUBLIC_RESEND_API_KEY` or `NEXT_PUBLIC_CONTACT_EMAIL`
- The service role key is server-only and must never be exposed in the browser bundle
- If either value is missing, the form routes fail safely with a generic temporary-unavailable response instead of exposing configuration details
- Copy `.env.example` to `.env.local` if you want a starter template

## Local development

```bash
npm install
npm run dev
```

The app runs locally at `http://localhost:3000`.

## Verification commands

```bash
npm run lint
npm run typecheck
npm run build
```

The production build output is written to `.next`.

`npm run typecheck` uses `tsconfig.typecheck.json` for TypeScript checking only, while `npm run build` performs the Next.js production build. This avoids `.next` collisions when both commands are run in the same CI or local session.

## Form behavior

- Contact and referral forms submit to internal Next.js route handlers
- Submissions are validated with Zod on both client and server
- Contact leads can be written to Supabase without storing PHI-heavy intake data
- Server-side logging is limited to safe submission metadata only
- Referral requests explicitly warn users not to include protected health information
- Referral form allows patient initials only

### Submission endpoints

- `POST /api/contact`
- `POST /api/referral`

These endpoints validate submissions with Zod, apply a basic in-memory rate limit, sanitize inbound text, and send emails through Resend. Contact submissions can also write lead metadata to Supabase.

## Admin provisioning

Use the built-in invite script to provision the ValleyHC admin account in Supabase Auth and send the setup email through Resend:

```bash
node scripts/invite-admin.ts
```

Or with npm:

```bash
npm run invite-admin
```

The script:

1. Creates or refreshes an invite link for `T.Rapp@valleyhc.org`
2. Targets the password setup flow at `https://crm.valleyhc.org/set-password`
3. Sends the invite email through Resend

The admin password setup flow is handled in-app:

- `/login` authenticates the admin with Supabase Auth
- `/set-password` lets the invited admin choose a password on first use
- `/dashboard` is protected by Supabase cookie-session validation

## Vercel deployment

Recommended next steps for deployment:

1. Import the repository into Vercel
2. Keep the framework preset as `Next.js`
3. Deploy preview builds and verify the public routes plus `/api/contact` and `/api/referral`
4. Add the production domain in Vercel once DNS is ready
5. Confirm generated `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`
6. Replace the internal no-persistence handlers with your chosen intake destination when you are ready

### Deployment-ready features already in repo

- Site-wide metadata with Vercel-aware `metadataBase`
- `robots.txt`, sitemap, and web manifest routes
- Security headers in `next.config.mjs`
- Standalone public routing with no dependency on VEHR UI
- Resend-ready API routes for contact and referral requests

## Resend setup

1. Go to Resend and create an API key
2. Verify your sending domain, or use the Resend test sender during setup
3. Add `RESEND_API_KEY` and `CONTACT_EMAIL` to Vercel project environment variables
4. Redeploy after the variables are added

## Azure Static Web Apps deployment

This project uses Next.js App Router API routes for `/api/contact` and `/api/referral`, so it should be deployed to Azure Static Web Apps as a hybrid Next.js app instead of a pure static export.

The current route handlers are intentionally kept on the Node.js runtime because the site depends on the Resend SDK and server-only environment variables. This keeps the existing email functionality intact for Azure Static Web Apps hybrid hosting.

### Workflow

The repository includes a GitHub Actions workflow at `.github/workflows/azure-static-web-apps.yml` that:

1. Installs dependencies with `npm install`
2. Runs `npm run lint`
3. Runs `npm run build`
4. Deploys to Azure Static Web Apps

The workflow listens for pushes to `main` and `master`. If you keep a different default branch, update the workflow trigger to match.

### Azure setup

1. In the Azure portal, create a new Static Web App
2. Select your GitHub repository and branch
3. Choose `Custom` build settings
4. Set:
   - App location: `/`
   - API location: leave blank
   - Output location: leave blank for the hybrid Next.js deployment flow
5. Finish the resource creation

### Runtime environment variables

Add these application settings in Azure Static Web Apps after the site is created:

```text
RESEND_API_KEY
CONTACT_EMAIL
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

In the Azure portal:

1. Open your Static Web App
2. Go to `Environment variables`
3. Add `RESEND_API_KEY`
4. Add `CONTACT_EMAIL`
5. Add `SUPABASE_URL`
6. Add `SUPABASE_ANON_KEY`
7. Add `SUPABASE_SERVICE_ROLE_KEY`
8. Save the settings and redeploy the site

After the variables are added, verify the public pages, `/api/contact`, `/api/referral`, `/login`, `/set-password`, and `/dashboard`.

## MCP project config

The repository also includes a local editor MCP context file at `.vscode/mcp.json` for this project. It describes ValleyHC as a public marketing site, keeps the no-PHI rules explicit, and marks VEHR and revenue OS integrations as future work.
