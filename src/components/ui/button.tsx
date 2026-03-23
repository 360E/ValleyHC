import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-strong)]",
        secondary:
          "border border-[var(--border-strong)] bg-white text-[var(--primary)] hover:border-[var(--primary)] hover:bg-[var(--surface-muted)]",
        accent: "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]",
        ghost: "text-[var(--primary)] hover:bg-[var(--surface-muted)]",
      },
      size: {
        default: "min-h-11 px-5 py-3 text-sm",
        sm: "min-h-10 px-4 py-2.5 text-sm",
        lg: "min-h-12 px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
