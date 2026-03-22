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
    <section className={cn("px-4 pt-12 sm:px-6 lg:pt-16", className)}>
      <div className="mx-auto grid max-w-6xl gap-10 rounded-[2rem] border border-white/70 bg-brand-mesh px-6 py-10 shadow-[var(--shadow-soft)] md:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-12 lg:py-14">
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">{eyebrow}</p>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-[var(--site-foreground)] md:text-5xl">
              {title}
            </h1>
            <p className="text-pretty max-w-2xl text-base leading-7 text-[var(--text-muted)] md:text-lg">{description}</p>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>

        {aside ? (
          <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-6 shadow-[0_24px_60px_-32px_rgba(21,62,117,0.28)]">
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}
