import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";

// Ship real HTML to visitors and crawlers; React hydrates the interactions.
const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
  const { createElement } = await import("react");
  const html = await readFile("dist/index.html", "utf8");
  await writeFile(
    "dist/index.html",
    // Cloudflare's email obfuscator otherwise changes the DOM before hydration.
    // https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/
    html.replace(
      "<!--app-html-->",
      `<!--email_off-->${renderToString(createElement(App))}<!--/email_off-->`,
    ),
  );
  await mkdir("dist/licenses", { recursive: true });
  await Promise.all(
    ["dm-sans", "space-grotesk"].map((font) =>
      copyFile(
        `node_modules/@fontsource/${font}/LICENSE`,
        `dist/licenses/${font}.txt`,
      ),
    ),
  );
} finally {
  await vite.close();
}
