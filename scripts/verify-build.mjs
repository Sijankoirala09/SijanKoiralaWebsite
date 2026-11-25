import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const html = await readFile("dist/index.html", "utf8");
assert(
  html.includes("A little craft."),
  "The production page must contain prerendered content.",
);
assert(!html.includes("<!--app-html-->"), "Prerendering must finish.");
assert.equal(
  (await readFile("dist/CNAME", "utf8")).trim(),
  "sijankoirala.com.np",
);
for (const file of [
  ".nojekyll",
  "favicon.svg",
  "portrait.jpg",
  "social-card.png",
  "robots.txt",
  "sitemap.xml",
  "licenses/dm-sans.txt",
  "licenses/space-grotesk.txt",
]) {
  await access(`dist/${file}`);
}
for (const [, path] of html.matchAll(/(?:src|href)="(\/assets\/[^"?]+)"/g)) {
  await access(`dist${path}`);
}
console.log(
  "Verified: prerendered HTML, custom domain, metadata assets, and bundled files.",
);
