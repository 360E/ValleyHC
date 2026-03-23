import { CheckCircle2 } from "lucide-react";

const trustBlocks = [
  {
    title: "Reach out",
    text: "Call or submit a request. We keep the first step simple and do not ask for sensitive medical details online.",
  },
  {
    title: "Talk with our team",
    text: "We follow up to understand your needs, answer practical questions, and explain what happens next.",
  },
  {
    title: "Begin care",
    text: "You get connected with the right provider and a clear plan for intake, treatment, and follow-through.",
  },
] as const;

const trustBarItems = ["Serving Yakima, WA", "Confidential & Secure", "No PHI submitted online"] as const;

export function TrustSection() {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(238,243,240,0.9))] px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-[1100px] space-y-10">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="space-y-4">
            <p className="eyebrow text-xs font-semibold text-[var(--accent)]">What to Expect</p>
            <h2 className="display-title text-4xl text-[var(--primary-strong)] md:text-[3.3rem]">A straightforward path into treatment.</h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-[var(--text-muted)] md:text-lg lg:justify-self-end">
            Trust comes from clarity. The next step should feel calm, structured, and handled by professionals.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trustBlocks.map((block, index) => (
            <div key={block.title} className="rounded-[1.75rem] border border-[var(--border)] bg-white p-7 shadow-[var(--shadow-soft)]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-[var(--border-strong)]">0{index + 1}</p>
                  <CheckCircle2 className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--site-foreground)]">{block.title}</h3>
                <p className="text-base leading-7 text-[var(--text-muted)]">{block.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-base text-[var(--text-muted)]">
          {trustBarItems.map((item, index) => (
            <div key={item} className="flex items-center gap-5">
              {index > 0 ? <span className="hidden h-1.5 w-1.5 rounded-full bg-[var(--accent)] sm:inline-flex" aria-hidden="true" /> : null}
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
