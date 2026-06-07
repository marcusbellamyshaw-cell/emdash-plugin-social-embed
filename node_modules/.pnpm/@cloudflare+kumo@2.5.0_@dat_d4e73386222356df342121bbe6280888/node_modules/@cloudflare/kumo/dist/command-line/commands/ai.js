#!/usr/bin/env node

// src/command-line/commands/ai.ts
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
function ai() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const usagePath = join(__dirname, "..", "..", "ai", "USAGE.md");
  try {
    const content = readFileSync(usagePath, "utf-8");
    console.log(content);
  } catch {
    console.error(
      "Could not read ai/USAGE.md. Make sure you are running this from an installed @cloudflare/kumo package."
    );
    process.exit(1);
  }
}
export {
  ai
};
