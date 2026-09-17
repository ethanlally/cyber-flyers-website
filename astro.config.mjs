// @ts-check
import { env } from "node:process";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: env.ASTRO_SITE || undefined,
  base: env.ASTRO_BASE || "/",
  trailingSlash: "always",
});
