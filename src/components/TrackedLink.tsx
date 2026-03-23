"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import { trackEvent } from "@/lib/analytics";

type TrackedLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  eventAction: string;
  eventLabel: string;
};

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");
}

export function TrackedLink({
  href,
  eventAction,
  eventLabel,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(eventAction, eventLabel);
    onClick?.(event);
  };

  const trackingProps = {
    "data-analytics-event": eventAction,
    "data-analytics-label": eventLabel,
  };

  if (isExternalHref(href)) {
    return (
      <a href={href} onClick={handleClick} {...trackingProps} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...trackingProps} {...props}>
      {children}
    </Link>
  );
}
