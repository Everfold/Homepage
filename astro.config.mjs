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
    ssr: {
      noExternal: [/^astro:/],
    },
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
        name: "astro-virtual-modules-before-filesystem",
        configResolved(config) {
          // NTFS with ADS treats `astro:*` paths as the `astro` directory.
          // Let Astro resolve its virtual modules before Vite checks disk.
          for (const plugin of config.plugins) {
            if (
              !/^astro[:-]/.test(plugin.name) ||
              plugin.enforce ||
              !plugin.resolveId
            ) {
              continue;
            }
            const hook = plugin.resolveId;
            if (typeof hook === "object") {
              if (hook.order) continue;
              const idFilter =
                hook.filter && "id" in hook.filter ? hook.filter.id : undefined;
              const matchesAstroVirtual = Array.isArray(idFilter)
                ? idFilter.some((f) => String(f).includes("astro:"))
                : typeof idFilter === "string" || idFilter instanceof RegExp
                  ? String(idFilter).includes("astro:")
                  : false;
              if (!matchesAstroVirtual) continue;
              plugin.resolveId = { ...hook, order: "pre" };
            }
          }
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
      logo: {
        src: "./src/assets/logo.svg",
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
