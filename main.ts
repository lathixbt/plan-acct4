// Entry for the-plan-make-fun-will-carry-20261122-2138 (account 4).
// Writes one short plan (1-280 chars) to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PLAN =
  "Scrape Google Maps for dental clinics, verify email + phone, add owner + site. " +
  "Sell 500-lead lists at $99 to marketing agencies via Gumroad + email. " +
  "Day 1: build list 1, email 100 agencies. " +
  "Day 30: ~$800 (8 lists). " +
  "Edge: verified lists, refreshed weekly; rivals sell stale data.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const chars = Array.from(PLAN).length;
if (chars < 1 || chars > 280 || PLAN.trim().length === 0) {
  throw new Error(`plan must be 1-280 chars, got ${chars}`);
}

// The judge's concrete test: price, day-one action and day-30 outcome must be named.
for (const must of ["$99", "Day 1", "Day 30"]) {
  if (!PLAN.includes(must)) {
    throw new Error(`plan is missing required detail: ${must}`);
  }
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, PLAN, "utf8");

// Confirm the file on disk is byte-exact what we intended to write.
if (readFileSync(target, "utf8") !== PLAN) {
  throw new Error("entry.txt does not match the plan text");
}

console.log(`wrote ${chars} chars (${Buffer.byteLength(PLAN, "utf8")} bytes) to ${target}`);
