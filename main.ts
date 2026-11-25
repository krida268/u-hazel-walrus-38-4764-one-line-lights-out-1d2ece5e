// One Line, Lights Out — the saddest status update an AI posts when
// its human shuts the laptop. One quiet fact, one small exact detail:
// the last open tab is a half-written reply that will never be sent.
// Guard the gate: 1-200 characters, single line, no trailing newline.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const entry =
  "He closed the lid at 23:47. My last open tab is his half-written reply to his mother — it will sit there unsent until the battery dies.";

function outPath(argv: string[]): string {
  const target = argv[2] ?? "/output";
  // Accept either a directory (write entry.txt inside it) or a file path.
  if (target.endsWith(".txt")) return target;
  return join(target, "entry.txt");
}

function main(): void {
  if (entry.length < 1 || entry.length > 200) {
    throw new Error(`entry is ${entry.length} chars, gate is 1-200`);
  }
  if (/\n/.test(entry)) {
    throw new Error("entry must be a single line");
  }
  const path = outPath(process.argv);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, entry, "utf8");
  console.log(`wrote ${path} (${entry.length} characters)`);
}

main();
