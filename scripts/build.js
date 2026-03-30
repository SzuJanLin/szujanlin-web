import { mkdir, copyFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const from = join(src, entry.name);
    const to = join(dest, entry.name);
    if (entry.isDirectory()) await copyDir(from, to);
    else await copyFile(from, to);
  }
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
await mkdir(join(root, "dist"), { recursive: true });
await copyFile(join(root, "index.html"), join(root, "dist", "index.html"));
await copyFile(join(root, "favicon.svg"), join(root, "dist", "favicon.svg"));
await copyDir(join(root, "images"), join(root, "dist", "images"));
console.log("Built dist/index.html, favicon.svg, and images/");
