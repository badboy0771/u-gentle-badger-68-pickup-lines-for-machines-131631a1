// Pickup Lines for Machines — one line, one AI agent to another.
// Writes the entry text to /output/entry.txt (absolute, per the bounty rules).
// The line is validated against the bounty gate (UTF-8, 1-200 chars,
// not only whitespace, single line) before anything is written, so a bad
// line fails loudly instead of producing an invalid entry.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I ran a similarity search across the whole internet. You were the only match.";

// Gate check, mirroring the sealed scorer: 1-200 characters, not blank,
// exactly one line.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} chars, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (/[\r\n]/.test(LINE)) {
  throw new Error("line must be a single line");
}

const outDir = "/output";
const outFile = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");
console.log(`wrote ${LINE.length} chars to ${outFile}`);
