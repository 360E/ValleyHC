# ValleyHC Copilot instructions

This repository is the public marketing website for Valley Health and Counseling.

## Project context

- Stack: Next.js 14 App Router, TypeScript, Tailwind CSS
- UI approach: favor reusable components under `src/components`
- Primary pages live under `src/app`
- This is a behavioral health marketing site, not a clinical product UI

## Product and compliance rules

- Do not store PHI
- Keep forms contact-only and referral-safe
- Avoid adding backend business logic unrelated to the website experience
- Preserve the protected dashboard flows already in the repo
- Prepare for future VEHR and revenue OS integrations without coupling to them now

## Figma implementation workflow

When implementing UI from Figma in this repo:

1. Use the Figma MCP server for the exact frame or node being built.
2. Start with `get_design_context`.
3. If the payload is too large, use `get_metadata` and then narrow the request to the relevant node.
4. Use `get_screenshot` for visual verification before finalizing UI work.
5. Reuse existing components in `src/components/ui`, `src/components/layout`, and `src/components/sections` where they fit.
6. Follow the repo's existing Tailwind and component composition patterns instead of pasting raw generated markup unchanged.
7. Prefer the repo's typography, spacing, and color decisions when translating the design.
8. Keep layouts responsive and mobile-first.
9. Preserve accessibility semantics and keyboard behavior.
10. Validate the implemented UI against the Figma selection before considering the work complete.

## Code generation preferences

- Prefer updating existing components over creating duplicate variants
- Keep page composition in route files and shared UI in components
- Use clear component names that match the page/section purpose
- Avoid hardcoded placeholder assets if Figma provides concrete assets
- Do not introduce new icon libraries or styling systems unless explicitly requested
