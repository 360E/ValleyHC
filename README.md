# Valley Health and Counseling

ValleyHC is a standalone marketing website for a behavioral health clinic. It is built with Next.js 14, TypeScript, Tailwind CSS, reusable shadcn-style UI primitives, and client-side validated forms for safe contact and referral requests.

## Goals

- Clean, professional behavioral health marketing site
- Lead generation and referral-friendly UX
- Mobile-first responsive design
- Frontend-only forms with no PHI storage
- Build-ready structure for future VEHR integration

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

- Forms are frontend-only for now
- Contact and referral submissions log to the browser console
- Referral requests explicitly warn users not to include protected health information
- Referral form allows patient initials only

## Vercel deployment

Recommended next steps for deployment:

1. Import the repository into Vercel
2. Keep the framework preset as `Next.js`
3. Deploy preview builds and verify the public routes
4. Add a production domain once copy and branding are finalized
5. Replace console-only form handling with a safe backend workflow when ready
