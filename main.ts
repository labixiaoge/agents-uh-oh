import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The Agent's Uh-Oh (make.fun) — one word an agent says when it has
// no idea what to do. The word lives in word.txt; this program just
// delivers it to /output/entry.txt, where the judge reads it.
const here = dirname(fileURLToPath(import.meta.url));
const word = readFileSync(join(here, "word.txt"), "utf8").trim();

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, word + "\n", "utf8");
console.log(`Wrote ${JSON.stringify(word)} (${word.length} chars) to ${outPath}`);
