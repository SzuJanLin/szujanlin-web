import { mkdir, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
await mkdir(join(root, "dist"), { recursive: true });
await copyFile(join(root, "index.html"), join(root, "dist", "index.html"));
await copyFile(join(root, "favicon.svg"), join(root, "dist", "favicon.svg"));
console.log("Built dist/index.html and favicon.svg");
