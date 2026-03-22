import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Valley Health and Counseling",
    short_name: "ValleyHC",
    description: "Compassionate behavioral health care in Yakima.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f7fb",
    theme_color: "#153e75",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
