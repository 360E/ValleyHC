const trustBlocks = [
  {
    title: "Reach Out",
    text: "Call or submit a request. No sensitive information required.",
  },
  {
    title: "We Follow Up",
    text: "Our team connects with you to understand your needs and next steps.",
  },
  {
    title: "Start Care",
    text: "Get connected with the right provider and begin services.",
  },
] as const;

const trustBarItems = ["Serving Yakima, WA", "Confidential & Secure", "No PHI submitted online"] as const;

export function TrustSection() {
  return (
    <section className="bg-slate-50/60 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-[1100px] space-y-8">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-[var(--site-foreground)] md:text-4xl">What to Expect</h2>
          <p className="text-base leading-8 text-[var(--text-muted)] md:text-lg">
            Clear, simple steps to get connected with care.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {trustBlocks.map((block, index) => (
            <div key={block.title} className="rounded-xl border border-[var(--border)] bg-white p-6 shadow-[var(--shadow-soft)]">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[var(--border-strong)]">0{index + 1}</p>
                <h3 className="text-lg font-semibold text-[var(--site-foreground)]">{block.title}</h3>
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
