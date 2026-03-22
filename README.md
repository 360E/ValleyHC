# Valley Health and Counseling

ValleyHC is a standalone marketing website for a behavioral health clinic. It is built with Next.js 14, TypeScript, Tailwind CSS, reusable shadcn-style UI primitives, and Resend-backed contact/referral submission flows designed to avoid PHI storage.

## Goals

- Clean, professional behavioral health marketing site
- Lead generation and referral-friendly UX
- Mobile-first responsive design
- Frontend-only forms with no PHI storage
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

## Tech stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Lucide icons
- React Hook Form
- Zod
- Resend
- `clsx`, `class-variance-authority`, and `tailwind-merge`

## Environment variables

Create `.env.local`:

```bash
RESEND_API_KEY=
CONTACT_EMAIL=your-email@example.com
```

- `RESEND_API_KEY` is your Resend API key
- `CONTACT_EMAIL` is the inbox that should receive website contact and referral emails

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

## Form behavior

- Contact and referral forms submit to internal Next.js route handlers
- Submissions are validated with Zod on both client and server
- The current implementation does not persist PHI or write submissions to a database
- Server-side logging is limited to safe submission metadata only
- Referral requests explicitly warn users not to include protected health information
- Referral form allows patient initials only

### Submission endpoints

- `POST /api/contact`
- `POST /api/referral`

These endpoints validate submissions with Zod, apply a basic in-memory rate limit, sanitize inbound text, and send emails through Resend without writing to a database.

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

### Workflow

The repository includes a GitHub Actions workflow at `.github/workflows/azure-static-web-apps.yml` that:

1. Installs dependencies with `npm ci`
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

### GitHub secret

Add the deployment token from Azure Static Web Apps to your GitHub repository secrets as:

```text
AZURE_STATIC_WEB_APPS_API_TOKEN
```

### Runtime environment variables

Add these application settings in Azure Static Web Apps after the site is created:

```text
RESEND_API_KEY
CONTACT_EMAIL
```

After the variables are added, redeploy the app and verify the public pages plus `/api/contact` and `/api/referral`.
