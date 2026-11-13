import { cp, mkdir, rm, copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../", import.meta.url));
// GitHub Pages serves the repository root. Keep editable React source in src/.
await rm(root + "assets", { recursive: true, force: true });
await mkdir(root + "assets", { recursive: true });
await cp(root + "dist/assets", root + "assets", { recursive: true });
for (const name of [
  "index.html",
  "CNAME",
  ".nojekyll",
  "robots.txt",
  "sitemap.xml",
]) {
  await copyFile(root + "dist/" + name, root + name);
}
console.log(
  "Production files prepared for the existing GitHub Pages root deployment.",
);
