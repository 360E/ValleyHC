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
    <section id={id} className={cn("section-anchor-offset px-4 py-16 sm:px-6 lg:py-20", className)}>
      <div className="mx-auto max-w-6xl">
        {title ? (
          <div className="max-w-3xl space-y-4">
            {eyebrow ? (
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">{eyebrow}</p>
            ) : null}
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--site-foreground)] md:text-4xl">
              {title}
            </h2>
            {description ? <p className="text-pretty text-base leading-7 text-[var(--text-muted)]">{description}</p> : null}
          </div>
        ) : null}
        <div className={cn(title ? "mt-10" : "", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
