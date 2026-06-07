#!/usr/bin/env node

// src/command-line/commands/blocks.ts
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
function getRegistryPath() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  return join(__dirname, "..", "..", "ai", "component-registry.json");
}
function loadRegistry() {
  const registryPath = getRegistryPath();
  const content = readFileSync(registryPath, "utf-8");
  return JSON.parse(content);
}
function blocks() {
  try {
    const registry = loadRegistry();
    if (!registry.blocks || Object.keys(registry.blocks).length === 0) {
      console.log("No blocks available.");
      return;
    }
    const blockList = Object.values(registry.blocks);
    const byCategory = /* @__PURE__ */ new Map();
    for (const block of blockList) {
      const category = block.category || "Other";
      if (!byCategory.has(category)) {
        byCategory.set(category, []);
      }
      byCategory.get(category).push(block);
    }
    const sortedCategories = [...byCategory.keys()].sort();
    console.log(`Kumo Blocks (${blockList.length} total)
`);
    for (const category of sortedCategories) {
      const categoryBlocks = [...byCategory.get(category)].sort(
        (a, b) => a.name.localeCompare(b.name)
      );
      console.log(`${category}:`);
      for (const block of categoryBlocks) {
        console.log(`  ${block.name} - ${block.description}`);
      }
      console.log();
    }
    console.log("To install a block, run:");
    console.log("  kumo add <block-name>\n");
    console.log("Example:");
    console.log("  kumo add PageHeader");
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") {
      console.error(
        "Error: Component registry not found. Run `pnpm codegen:registry` first."
      );
      process.exit(1);
    }
    throw error;
  }
}
export {
  blocks
};
