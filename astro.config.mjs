// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import sitemap from "@astrojs/sitemap";

import starlight from "@astrojs/starlight";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://everfold.org",
  prefetch: true,
  compressHTML: true,
  vite: {
    optimizeDeps: {
      exclude: ["astro:toolbar:internal"],
    },
    server: {
      watch: {
        ignored: ["**/.direnv/**"],
      },
    },

    plugins: [
      {
        name: "resolve-astro-assets",
        enforce: "pre",
        resolveId(id) {
          if (id === "astro:assets") return "\0astro:assets";
        },
      },
      tailwindcss(),
    ],
  },
  integrations: [
    react(),
    sitemap(),
    starlight({
      title: "Everfold Document",
    }),
  ],
});
