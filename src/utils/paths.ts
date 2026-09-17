/** Prefix site-root paths with Astro's base; preserve external URLs and fragments. */
export function sitePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
}
