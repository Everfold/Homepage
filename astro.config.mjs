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
  redirects: {
    "/en": "/en/docs/",
  },
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
      title: {
        "zh-CN": "Everfold 文档",
        en: "Everfold Documentation",
      },
      defaultLocale: "root",
      locales: {
        root: { label: "简体中文", lang: "zh-CN" },
        en: { label: "English", lang: "en" },
      },
      disable404Route: true,
    }),
  ],
});
