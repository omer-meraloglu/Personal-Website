import { build } from "vite";
import { readFile, writeFile, rm } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
const temporaryBuild = resolve(".prerender");
try {
  await build({
    logLevel: "warn",
    build: {
      ssr: resolve("src/entry-server.jsx"),
      outDir: temporaryBuild,
      emptyOutDir: true,
    },
    publicDir: false,
  });
  const { render } = await import(
    pathToFileURL(resolve(temporaryBuild, "entry-server.js"))
  );
  const markup = render();
  const html = await readFile("dist/index.html", "utf8");
  if (!html.includes('<div id="root"></div>'))
    throw new Error("Expected React mount point missing.");
  await writeFile(
    "dist/index.html",
    html.replace(
      '<div id="root"></div>',
      '<div id="root">' + markup + "</div>",
    ),
  );
  console.log(
    "Pre-rendered the React portfolio for immediate loading and search engines.",
  );
} finally {
  await rm(temporaryBuild, { recursive: true, force: true });
}
