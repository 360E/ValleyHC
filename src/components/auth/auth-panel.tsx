import type { ReactNode } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AuthPanelProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthPanel({ eyebrow, title, description, children }: AuthPanelProps) {
  return (
    <section className="min-h-screen bg-[#f8fafc] px-6 py-24">
      <div className="mx-auto max-w-md">
        <Card className="rounded-2xl border-gray-200 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.25)]">
          <CardHeader className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>
            <div className="space-y-2">
              <CardTitle className="text-3xl">{title}</CardTitle>
              <CardDescription className="max-w-xl text-base leading-7">{description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="mt-0">{children}</CardContent>
        </Card>
      </div>
    </section>
  );
}
