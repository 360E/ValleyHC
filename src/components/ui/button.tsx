import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-[var(--primary)] text-white hover:bg-[var(--primary-strong)]",
        secondary: "border border-[var(--border)] bg-white text-[var(--primary)] hover:border-[var(--border-strong)] hover:bg-slate-50",
        accent: "bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]",
        ghost: "text-[var(--primary)] hover:bg-slate-50",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
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
