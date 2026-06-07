#!/usr/bin/env node

// src/command-line/commands/init.ts
import { createInterface } from "node:readline/promises";

// src/command-line/utils/config.ts
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
var DEFAULT_CONFIG = {
  blocksDir: "src/components/kumo",
  version: "1.0.0"
};
function writeConfig(config, projectRoot = process.cwd()) {
  const configPath = join(projectRoot, "kumo.json");
  const fullConfig = {
    ...DEFAULT_CONFIG,
    ...config
  };
  try {
    const content = JSON.stringify(fullConfig, null, 2) + "\n";
    writeFileSync(configPath, content, "utf-8");
  } catch (error) {
    throw new Error(
      `Failed to write kumo.json: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error }
    );
  }
}
function configExists(projectRoot = process.cwd()) {
  const configPath = join(projectRoot, "kumo.json");
  return existsSync(configPath);
}

// src/command-line/commands/init.ts
async function prompt(question, defaultValue) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  try {
    const suffix = defaultValue ? ` (${defaultValue})` : "";
    const answer = await rl.question(`${question}${suffix}: `);
    return answer.trim() || defaultValue || "";
  } finally {
    rl.close();
  }
}
async function confirm(question) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  try {
    const answer = await rl.question(`${question} (y/n): `);
    return answer.trim().toLowerCase() === "y";
  } finally {
    rl.close();
  }
}
async function init() {
  try {
    const projectRoot = process.cwd();
    if (configExists(projectRoot)) {
      console.log("\u26A0\uFE0F  kumo.json already exists in this directory.");
      const shouldOverwrite = await confirm("Do you want to overwrite it?");
      if (!shouldOverwrite) {
        console.log("Initialization cancelled.");
        process.exit(0);
      }
    }
    console.log("\n\u{1F680} Initializing Kumo configuration...\n");
    const blocksDir = await prompt(
      "Where should blocks be installed?",
      DEFAULT_CONFIG.blocksDir
    );
    const config = {
      blocksDir: blocksDir || DEFAULT_CONFIG.blocksDir,
      version: DEFAULT_CONFIG.version
    };
    writeConfig(config, projectRoot);
    console.log("\n\u2705 Created kumo.json with the following configuration:");
    console.log(`   \u{1F4C1} Blocks directory: ${config.blocksDir}`);
    console.log("\nNext steps:");
    console.log("  \u2022 Run `kumo blocks` to see available blocks");
    console.log("  \u2022 Run `kumo add <block>` to install a block");
  } catch (error) {
    console.error("Error initializing configuration:", error);
    process.exit(1);
  }
}
export {
  confirm,
  init,
  prompt
};
