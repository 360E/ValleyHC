# AI UI Workflow

This project is already set up in the right direction for prompt-driven UI work:

- `Next.js App Router` for a stable page structure
- `Tailwind CSS` for fast styling changes
- reusable UI primitives in [`src/components/ui`](c:\Code\ValleyHC\src\components\ui)
- section-based marketing pages in [`src/components/sections`](c:\Code\ValleyHC\src\components\sections)

## Recommended workflow in VS Code

Use this stack:

1. Open the repo in VS Code.
2. Use Codex or GitHub Copilot Chat in agent mode to request page changes directly in code.
3. Keep prompts scoped to one page or one section at a time.
4. Use `v0` only for rough first-pass layouts or component ideas, then move the code back into this repo and refine here.

## Best prompt pattern

Ask for changes using:

- the route or component you want changed
- the goal of the section
- the tone or visual direction
- any constraints on content or layout

Example:

```text
Update the homepage hero to feel more premium and clinical, not generic SaaS.
Keep the current brand colors, improve typography, add 3 proof points, and keep one primary CTA plus one secondary CTA.
```

## Editing rules that keep quality high

- Prefer updating existing section components instead of regenerating whole pages.
- Keep content in arrays or small objects when possible so future edits are easy.
- Reuse the tokens in [`src/app/globals.css`](c:\Code\ValleyHC\src\app\globals.css) instead of inventing new colors each time.
- Prefer structured cards, grids, and content blocks over long freeform markup.

## Suggested division of labor

- `Codex / Copilot`: layout changes, styling, new sections, responsiveness, component cleanup
- `v0`: quick concept exploration for a section or component
- Human review: final copy, business accuracy, legal/compliance-sensitive text

## Current design anchors

- Display typography comes from the `display-title` utility
- Shared color tokens live in `:root` in [`src/app/globals.css`](c:\Code\ValleyHC\src\app\globals.css)
- The homepage hero is the reference pattern for future prompt-driven marketing sections
