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
      <div className="mx-auto grid max-w-[1100px] gap-8 rounded-[2rem] border border-[var(--border)] bg-brand-mesh px-8 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="eyebrow text-xs font-semibold text-[var(--secondary)]">{eyebrow}</p>
          <div className="space-y-6">
            <h1 className="display-title text-balance text-4xl text-[var(--site-foreground)] md:text-[3.6rem]">
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
