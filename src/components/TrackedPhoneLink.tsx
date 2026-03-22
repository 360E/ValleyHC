"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import { trackCallClick } from "@/lib/analytics";

type TrackedPhoneLinkProps = ComponentPropsWithoutRef<"a"> & {
  label?: string;
};

export default function TrackedPhoneLink({
  href,
  children,
  label = "phone_click",
  onClick,
  ...props
}: TrackedPhoneLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackCallClick(label);
    onClick?.(event);
  };

  return (
    <a href={href} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
