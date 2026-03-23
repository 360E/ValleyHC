export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const pageview = (url: string) => {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", GA_ID, {
    page_path: url,
  });
};

export const trackEvent = (action: string, label: string, details?: Record<string, unknown>) => {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", action, {
    event_category: "engagement",
    event_label: label,
    ...details,
  });
};

export const trackCallClick = (label: string) => {
  trackEvent("call_click", label);
};

export const trackBookAppointmentClick = (label: string) => {
  trackEvent("book_appointment_click", label);
};

export const trackServiceCardClick = (label: string) => {
  trackEvent("service_card_click", label);
};

export const trackFormSubmit = (label: string, success: boolean) => {
  trackEvent("form_submit", `${label}_${success ? "success" : "error"}`);
};
