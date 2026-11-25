import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import { readFile, writeFile } from "node:fs/promises";

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
    html.replace("<!--app-html-->", renderToString(createElement(App))),
  );
} finally {
  await vite.close();
}
