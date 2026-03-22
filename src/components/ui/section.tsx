import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

export function Section({ id, eyebrow, title, description, children, className, contentClassName }: SectionProps) {
  return (
    <section id={id} className={cn("section-anchor-offset px-4 py-24 sm:px-6", className)}>
      <div className="mx-auto max-w-[1100px]">
        {title ? (
          <div className="max-w-2xl space-y-6">
            {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">{eyebrow}</p> : null}
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--site-foreground)] md:text-4xl">{title}</h2>
            {description ? <p className="text-pretty max-w-xl text-base leading-8 text-[var(--text-muted)] md:text-lg">{description}</p> : null}
          </div>
        ) : null}
        <div className={cn(title ? "mt-12" : "", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
