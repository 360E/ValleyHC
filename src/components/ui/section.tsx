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
          <div className="max-w-3xl space-y-5">
            {eyebrow ? <p className="eyebrow text-xs font-semibold text-[var(--secondary)]">{eyebrow}</p> : null}
            <h2 className="display-title text-balance text-[2.25rem] text-[var(--site-foreground)] md:text-[3.2rem]">{title}</h2>
            {description ? <p className="text-pretty max-w-xl text-base leading-8 text-[var(--text-muted)] md:text-lg">{description}</p> : null}
          </div>
        ) : null}
        <div className={cn(title ? "mt-12" : "", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
