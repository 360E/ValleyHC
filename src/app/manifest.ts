import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Valley Health Care",
    short_name: "ValleyHC",
    description: "Community-based healthcare in Yakima with mental health, addiction treatment, primary care, and medication support.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7fafc",
    theme_color: "#0F4C5C",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
