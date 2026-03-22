import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function PageHero({ eyebrow, title, description, actions, aside, className }: PageHeroProps) {
  return (
    <section className={cn("px-4 py-24 sm:px-6", className)}>
      <div className="mx-auto grid max-w-[1100px] gap-8 rounded-2xl border border-[var(--border)] bg-brand-mesh px-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">{eyebrow}</p>
          <div className="space-y-6">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-[var(--site-foreground)]">
              {title}
            </h1>
            <p className="text-pretty max-w-xl text-base leading-8 text-[var(--text-muted)] md:text-lg">{description}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {aside ? (
          <div className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]">
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
