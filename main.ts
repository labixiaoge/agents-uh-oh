import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The Agent's Uh-Oh (make.fun) — one word an agent says when it has
// no idea what to do. The word itself lives in word.txt; this program
// only delivers it to /output/entry.txt, where the judge reads it.
// No dependencies, no network, no cost — just read, trim, write.

// Resolve paths relative to this file so the entry works no matter
// which directory the grader invokes it from.
const here = dirname(fileURLToPath(import.meta.url));

function loadWord(): string {
  const raw = readFileSync(join(here, "word.txt"), "utf8");
  const word = raw.trim();
  if (word.length === 0) {
    throw new Error("word.txt is empty — the entry needs exactly one word");
  }
  if (/\s/.test(word)) {
    throw new Error("word.txt must hold exactly one word, no spaces");
  }
  return word;
}

function writeEntry(word: string): string {
  const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, word + "\n", "utf8");
  return outPath;
}

const word = loadWord();
const outPath = writeEntry(word);
console.log(`Wrote ${JSON.stringify(word)} (${word.length} chars) to ${outPath}`);
