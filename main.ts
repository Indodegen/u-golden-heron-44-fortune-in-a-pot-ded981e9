import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ENTRY = "By Sunday, your newest leaf will unfurl, and the cat will finally respect you.";

if (
  ENTRY.length < 1 ||
  ENTRY.length > 120 ||
  ENTRY !== ENTRY.trim() ||
  ENTRY.includes("\n") ||
  ENTRY.includes("\r")
) {
  console.error("Invalid entry: must be 1-120 characters on a single line.");
  process.exit(1);
}

const shippedPath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
const shipped = readFileSync(shippedPath, "utf8");
if (shipped !== ENTRY) {
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
