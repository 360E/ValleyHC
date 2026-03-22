# Valley Health and Counseling

ValleyHC is a standalone marketing website for a behavioral health clinic. It is built with Next.js 14, TypeScript, Tailwind CSS, reusable shadcn-style UI primitives, and validated contact/referral submission flows designed to avoid PHI storage.

## Goals

- Clean, professional behavioral health marketing site
- Lead generation and referral-friendly UX
- Mobile-first responsive design
- Frontend-only forms with no PHI storage
- Build-ready structure for future VEHR integration
- Vercel-friendly deployment path with domain-ready metadata and SEO primitives

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
- `clsx`, `class-variance-authority`, and `tailwind-merge`

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

## Form behavior

- Contact and referral forms submit to internal Next.js route handlers
- Submissions are validated with Zod on both client and server
- The current implementation does not persist PHI or write submissions to a database
- Server-side logging is limited to safe submission metadata only
- Referral requests explicitly warn users not to include protected health information
- Referral form allows patient initials only

### Submission endpoints

- `POST /api/contact-request`
- `POST /api/referral-request`

These endpoints are ready to be swapped later to email, CRM, intake orchestration, or VEHR-connected workflows without changing the public form UX.

## Vercel deployment

Recommended next steps for deployment:

1. Import the repository into Vercel
2. Keep the framework preset as `Next.js`
3. Deploy preview builds and verify the public routes plus `/api/contact-request` and `/api/referral-request`
4. Add the production domain in Vercel once DNS is ready
5. Confirm generated `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`
6. Replace the internal no-persistence handlers with your chosen intake destination when you are ready

### Deployment-ready features already in repo

- Site-wide metadata with Vercel-aware `metadataBase`
- `robots.txt`, sitemap, and web manifest routes
- Security headers in `next.config.mjs`
- Standalone public routing with no dependency on VEHR UI
