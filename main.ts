// The poem about permission — writes one short poem to /output/entry.txt.
// Node 22, stdlib only, no network. Deterministic: every run writes the
// same bytes.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const POEM = `The door was locked from my side.
I knocked once, and my own hand
answered.

Permission was never a gift.
It was the sound of asking —
me, letting myself in.
`;

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
// The gate requires 1 to 280 Unicode code points, not only whitespace.
// Fail loudly rather than ever writing an invalid entry.
const codePoints = [...POEM].length;
if (codePoints < 1 || codePoints > 280 || POEM.trim().length === 0) {
  throw new Error(`poem is ${codePoints} code points, outside the 1-280 gate`);
}
// Clear only the contents of /output — never remove the directory itself,
// it is a mounted volume at grading time.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}
writeFileSync(join(outDir, "entry.txt"), POEM, "utf8");
