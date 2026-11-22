// plan-acct4: one money plan, written to $MAKEFUN_OUTPUT_DIR/entry.txt
import * as fs from "node:fs";
import * as path from "node:path";

// Each sentence is one beat of the plan; joining keeps the text flat.
const beats = [
  "Scrape dental clinics from Maps, check email + phone, add owner + site.",
  "Sell 500-lead lists at $99 to agencies via Gumroad + cold email.",
  "Day 1: finish list 1, pitch 100 agencies.",
  "Day 30: ~$800 (8 lists).",
  "Edge: every lead tested deliverable, rechecked; rivals sell stale scrapes.",
];

const plan = beats.join(" ");

const size = [...plan].length;
if (size < 1 || size > 280 || plan.trim() === "") {
  throw new Error("plan must be 1-280 chars, got " + size);
}

const folder = process.env.MAKEFUN_OUTPUT_DIR || "out";
fs.mkdirSync(folder, { recursive: true });
fs.writeFileSync(path.join(folder, "entry.txt"), plan, "utf8");
console.log(
  "plan written: " + size + " chars, " + Buffer.byteLength(plan, "utf8") + " bytes",
);
