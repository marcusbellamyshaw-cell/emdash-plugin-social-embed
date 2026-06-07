#!/usr/bin/env node

// src/command-line/commands/ls.ts
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
function ls() {
  try {
    const registry = loadRegistry();
    const components = Object.values(registry.components);
    const byCategory = /* @__PURE__ */ new Map();
    for (const component of components) {
      const category = component.category || "Other";
      if (!byCategory.has(category)) {
        byCategory.set(category, []);
      }
      byCategory.get(category).push(component);
    }
    const sortedCategories = [...byCategory.keys()].sort();
    console.log(`Kumo Components (${components.length} total)
`);
    for (const category of sortedCategories) {
      const categoryComponents = [...byCategory.get(category)].sort(
        (a, b) => a.name.localeCompare(b.name)
      );
      console.log(`${category}:`);
      for (const component of categoryComponents) {
        console.log(`  ${component.name} - ${component.description}`);
      }
      console.log();
    }
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
  ls
};
