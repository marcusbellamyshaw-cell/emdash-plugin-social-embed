#!/usr/bin/env node

// src/command-line/commands/add.ts
import { existsSync as existsSync2, mkdirSync, readFileSync as readFileSync2, writeFileSync as writeFileSync2 } from "node:fs";
import { dirname, join as join2, resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

// src/command-line/utils/config.ts
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
var DEFAULT_CONFIG = {
  blocksDir: "src/components/kumo",
  version: "1.0.0"
};
function readConfig(projectRoot = process.cwd()) {
  const configPath = join(projectRoot, "kumo.json");
  if (!existsSync(configPath)) {
    return null;
  }
  try {
    const content = readFileSync(configPath, "utf-8");
    const config = JSON.parse(content);
    return {
      ...DEFAULT_CONFIG,
      ...config
    };
  } catch (error) {
    throw new Error(
      `Failed to parse kumo.json: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error }
    );
  }
}

// src/command-line/utils/transformer.ts
function parseImports(content) {
  const importRegex = /import\s+(type\s+)?{([^}]+)}\s+from\s+["']([^"']+)["'];?/g;
  const imports = [];
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    imports.push({
      fullMatch: match[0],
      imports: match[2],
      path: match[3],
      startIndex: match.index,
      endIndex: match.index + match[0].length,
      isTypeOnlyImport: match[1] !== void 0
    });
  }
  return imports;
}
function shouldTransformToKumo(path) {
  if (!path.startsWith("../")) {
    return false;
  }
  return path.includes("/components/") || path.includes("/utils/");
}
function parseImportItems(imports, isTypeOnlyImport) {
  const items = imports.split(",").map((item) => item.trim()).filter((item) => item.length > 0);
  const valueImports = [];
  const typeImports = [];
  for (const item of items) {
    if (isTypeOnlyImport || item.startsWith("type ")) {
      const typeName = item.startsWith("type ") ? item.slice(5).trim() : item;
      typeImports.push(typeName);
    } else {
      valueImports.push(item);
    }
  }
  return { valueImports, typeImports };
}
function buildConsolidatedImport(valueImports, typeImports) {
  const parts = [];
  for (const item of valueImports) {
    parts.push(item);
  }
  for (const item of typeImports) {
    parts.push(`type ${item}`);
  }
  return `import { ${parts.join(", ")} } from "@cloudflare/kumo";`;
}
function transformImports(content) {
  const parsedImports = parseImports(content);
  const kumoImports = [];
  const nonKumoImports = [];
  for (const imp of parsedImports) {
    if (shouldTransformToKumo(imp.path)) {
      kumoImports.push(imp);
    } else {
      nonKumoImports.push(imp);
    }
  }
  if (kumoImports.length === 0) {
    return content;
  }
  const allValueImports = [];
  const allTypeImports = [];
  for (const imp of kumoImports) {
    const { valueImports, typeImports } = parseImportItems(
      imp.imports,
      imp.isTypeOnlyImport
    );
    allValueImports.push(...valueImports);
    allTypeImports.push(...typeImports);
  }
  const consolidatedImport = buildConsolidatedImport(
    allValueImports,
    allTypeImports
  );
  let result = content;
  const sortedKumoImports = [...kumoImports].sort(
    (a, b) => b.startIndex - a.startIndex
  );
  for (let i = 0; i < sortedKumoImports.length; i++) {
    const imp = sortedKumoImports[i];
    if (i === sortedKumoImports.length - 1) {
      result = result.slice(0, imp.startIndex) + consolidatedImport + result.slice(imp.endIndex);
    } else {
      let startIndex = imp.startIndex;
      let endIndex = imp.endIndex;
      if (startIndex > 0 && result[startIndex - 1] === "\n") {
        startIndex--;
      }
      result = result.slice(0, startIndex) + result.slice(endIndex);
    }
  }
  return result;
}

// src/command-line/commands/add.ts
import { createInterface } from "node:readline/promises";
function getRegistryPath() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const possiblePaths = [
    join2(__dirname, "..", "..", "ai", "component-registry.json"),
    join2(__dirname, "..", "ai", "component-registry.json"),
    join2(__dirname, "ai", "component-registry.json")
  ];
  for (const path of possiblePaths) {
    if (existsSync2(path)) {
      return path;
    }
  }
  throw new Error(
    "component-registry.json not found. Please regenerate with: pnpm codegen:registry"
  );
}
function getBlocksSourcePath() {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const possiblePaths = [
    join2(__dirname, "..", "..", "blocks-source"),
    join2(__dirname, "..", "blocks-source"),
    join2(__dirname, "blocks-source"),
    // Fallback to old location for backwards compatibility during development
    join2(__dirname, "..", "..", "src", "blocks"),
    join2(__dirname, "..", "src", "blocks"),
    join2(__dirname, "src", "blocks")
  ];
  for (const path of possiblePaths) {
    if (existsSync2(path)) {
      return path;
    }
  }
  throw new Error(
    "Blocks source directory not found. The package may be corrupted."
  );
}
function loadRegistry() {
  const registryPath = getRegistryPath();
  const content = readFileSync2(registryPath, "utf-8");
  return JSON.parse(content);
}
async function confirm(message) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });
  const answer = await rl.question(`${message} (y/n): `);
  rl.close();
  return answer.toLowerCase() === "y" || answer.toLowerCase() === "yes";
}
async function add(blockName) {
  if (!blockName) {
    console.error("Error: Block name is required.");
    console.log("\nUsage: kumo add <block-name>");
    console.log("\nRun 'kumo blocks' to see available blocks.");
    process.exit(1);
  }
  const config = readConfig();
  if (!config) {
    console.error(
      "Error: kumo.json not found. Run 'kumo init' first to initialize the configuration."
    );
    process.exit(1);
  }
  let registry;
  try {
    registry = loadRegistry();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Component registry not found. Run `pnpm codegen:registry` first.";
    console.error(`Error: ${message}`);
    process.exit(1);
  }
  const block = registry.blocks?.[blockName];
  if (!block) {
    console.error(`Error: Block '${blockName}' not found.`);
    console.log("\nRun 'kumo blocks' to see available blocks.");
    process.exit(1);
  }
  let blocksSourcePath;
  try {
    blocksSourcePath = getBlocksSourcePath();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Blocks source directory not found.";
    console.error(`Error: ${message}`);
    process.exit(1);
  }
  const projectRoot = process.cwd();
  const targetDir = join2(projectRoot, config.blocksDir);
  if (!existsSync2(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`\u{1F4C1} Created directory: ${config.blocksDir}`);
  }
  const blockExists = block.files.some((file) => {
    const targetPath = join2(targetDir, file);
    return existsSync2(targetPath);
  });
  if (blockExists) {
    console.log(
      `\u26A0\uFE0F  Block '${blockName}' already exists in ${config.blocksDir}`
    );
    const shouldOverwrite = await confirm("Do you want to overwrite it?");
    if (!shouldOverwrite) {
      console.log("Installation cancelled.");
      return;
    }
  }
  console.log(`\u{1F4E6} Installing block: ${blockName}`);
  for (const file of block.files) {
    const sourcePath = resolve(blocksSourcePath, file);
    const targetPath = resolve(targetDir, file);
    const relativeSource = relative(blocksSourcePath, sourcePath);
    if (relativeSource.startsWith("..") || relativeSource.startsWith("/") || isAbsolute(relativeSource)) {
      console.error(`Error: Invalid source path for file: ${file}`);
      process.exit(1);
    }
    const relativeTarget = relative(targetDir, targetPath);
    if (relativeTarget.startsWith("..") || relativeTarget.startsWith("/") || isAbsolute(relativeTarget)) {
      console.error(`Error: Invalid target path for file: ${file}`);
      process.exit(1);
    }
    const targetSubdir = dirname(targetPath);
    if (!existsSync2(targetSubdir)) {
      mkdirSync(targetSubdir, { recursive: true });
    }
    const content = readFileSync2(sourcePath, "utf-8");
    const transformed = transformImports(content);
    writeFileSync2(targetPath, transformed, "utf-8");
    console.log(`  \u2705 ${file}`);
  }
  if (block.dependencies.length > 0) {
    console.log(`
\u{1F4DA} This block depends on the following Kumo components:
`);
    for (const dep of block.dependencies) {
      console.log(`  - ${dep} (from @cloudflare/kumo)`);
    }
    console.log("\nMake sure @cloudflare/kumo is installed in your project:");
    console.log("  pnpm add @cloudflare/kumo");
  }
  console.log(`
\u{1F389} Successfully installed ${blockName}!`);
  console.log(`
You can now import it in your project:
`);
  const blockFile = block.files[0].replace(/\.tsx?$/, "");
  const importPath = join2(config.blocksDir, blockFile).replace(/\\/g, "/");
  console.log(`  import { ${blockName} } from "${importPath}";`);
}
export {
  add
};
