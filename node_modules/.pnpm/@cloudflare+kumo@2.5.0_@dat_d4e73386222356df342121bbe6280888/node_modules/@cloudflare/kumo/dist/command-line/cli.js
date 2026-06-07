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

// src/command-line/commands/doc.ts
import { readFileSync as readFileSync2 } from "node:fs";
import { dirname as dirname2, join as join2 } from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
function getRegistryPath2() {
  const __dirname = dirname2(fileURLToPath2(import.meta.url));
  return join2(__dirname, "..", "..", "ai", "component-registry.json");
}
function loadRegistry2() {
  const registryPath = getRegistryPath2();
  const content = readFileSync2(registryPath, "utf-8");
  return JSON.parse(content);
}
function findComponent(registry, name) {
  const lowerName = name.toLowerCase();
  for (const [key, component] of Object.entries(registry.components)) {
    if (key.toLowerCase() === lowerName) {
      return component;
    }
  }
  return null;
}
function findSimilar(registry, name) {
  const lowerName = name.toLowerCase();
  const componentNames = Object.keys(registry.components);
  return componentNames.filter(
    (n) => n.toLowerCase().includes(lowerName) || lowerName.includes(n.toLowerCase())
  ).slice(0, 5);
}
function formatProp(name, prop) {
  const parts = [];
  let typeStr = prop.type;
  if (prop.values && prop.values.length > 0) {
    typeStr = prop.values.map((v) => `"${v}"`).join(" | ");
  }
  const required = prop.required === true || prop.optional === false;
  const requiredStr = required ? "(required)" : "";
  const defaultStr = prop.default ? `[default: ${prop.default}]` : "";
  parts.push(`  ${name}: ${typeStr} ${requiredStr} ${defaultStr}`.trim());
  if (prop.description) {
    parts.push(`    ${prop.description}`);
  }
  if (prop.descriptions && Object.keys(prop.descriptions).length > 0) {
    for (const [value, desc] of Object.entries(prop.descriptions)) {
      parts.push(`    - "${value}": ${desc}`);
    }
  }
  return parts.join("\n");
}
function formatComponentDoc(component) {
  const lines = [];
  lines.push(`# ${component.name}
`);
  lines.push(`${component.description}
`);
  lines.push(
    `**Import:** \`import { ${component.name} } from "${component.importPath}";\`
`
  );
  lines.push(`**Category:** ${component.category}
`);
  const propEntries = Object.entries(component.props);
  if (propEntries.length > 0) {
    lines.push("## Props\n");
    for (const [propName, propInfo] of propEntries) {
      lines.push(formatProp(propName, propInfo));
      lines.push("");
    }
  }
  if (component.subComponents) {
    lines.push("## Sub-Components\n");
    for (const [subName, subInfo] of Object.entries(component.subComponents)) {
      lines.push(`### ${component.name}.${subName}`);
      if (subInfo.description) {
        lines.push(subInfo.description);
      }
      if (subInfo.renderElement) {
        lines.push(`Renders: ${subInfo.renderElement}`);
      }
      if (subInfo.props) {
        lines.push("Props:");
        for (const [propName, propInfo] of Object.entries(subInfo.props)) {
          const required = propInfo.required ? "(required)" : "";
          lines.push(`  - ${propName}: ${propInfo.type} ${required}`);
        }
      }
      lines.push("");
    }
  }
  if (component.examples && component.examples.length > 0) {
    lines.push("## Examples\n");
    for (const example of component.examples.slice(0, 3)) {
      lines.push("```tsx");
      lines.push(example);
      lines.push("```\n");
    }
    if (component.examples.length > 3) {
      lines.push(
        `(${component.examples.length - 3} more examples available in Storybook)`
      );
    }
  }
  if (component.colors && component.colors.length > 0) {
    lines.push("\n## Semantic Tokens Used\n");
    lines.push(component.colors.join(", "));
  }
  return lines.join("\n");
}
function docs() {
  try {
    const registry = loadRegistry2();
    const components = Object.values(registry.components);
    console.log(`# Kumo Component Documentation
`);
    console.log(`${components.length} components available
`);
    console.log("---\n");
    for (const component of components) {
      console.log(formatComponentDoc(component));
      console.log("\n---\n");
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
function doc(componentName) {
  if (!componentName) {
    docs();
    return;
  }
  try {
    const registry = loadRegistry2();
    const component = findComponent(registry, componentName);
    if (!component) {
      const similar = findSimilar(registry, componentName);
      console.error(`Component "${componentName}" not found.`);
      if (similar.length > 0) {
        console.error(`
Did you mean: ${similar.join(", ")}?`);
      }
      console.error(`
Run "kumo ls" to see all available components.`);
      process.exit(1);
    }
    console.log(formatComponentDoc(component));
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

// src/command-line/commands/init.ts
import { createInterface } from "node:readline/promises";

// src/command-line/utils/config.ts
import { existsSync, readFileSync as readFileSync3, writeFileSync } from "node:fs";
import { join as join3 } from "node:path";
var DEFAULT_CONFIG = {
  blocksDir: "src/components/kumo",
  version: "1.0.0"
};
function readConfig(projectRoot = process.cwd()) {
  const configPath = join3(projectRoot, "kumo.json");
  if (!existsSync(configPath)) {
    return null;
  }
  try {
    const content = readFileSync3(configPath, "utf-8");
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
function writeConfig(config, projectRoot = process.cwd()) {
  const configPath = join3(projectRoot, "kumo.json");
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
  const configPath = join3(projectRoot, "kumo.json");
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

// src/command-line/commands/blocks.ts
import { readFileSync as readFileSync4 } from "node:fs";
import { dirname as dirname3, join as join4 } from "node:path";
import { fileURLToPath as fileURLToPath3 } from "node:url";
function getRegistryPath3() {
  const __dirname = dirname3(fileURLToPath3(import.meta.url));
  return join4(__dirname, "..", "..", "ai", "component-registry.json");
}
function loadRegistry3() {
  const registryPath = getRegistryPath3();
  const content = readFileSync4(registryPath, "utf-8");
  return JSON.parse(content);
}
function blocks() {
  try {
    const registry = loadRegistry3();
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

// src/command-line/commands/add.ts
import { existsSync as existsSync2, mkdirSync, readFileSync as readFileSync5, writeFileSync as writeFileSync2 } from "node:fs";
import { dirname as dirname4, join as join5, resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath as fileURLToPath4 } from "node:url";

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
import { createInterface as createInterface2 } from "node:readline/promises";
function getRegistryPath4() {
  const __dirname = dirname4(fileURLToPath4(import.meta.url));
  const possiblePaths = [
    join5(__dirname, "..", "..", "ai", "component-registry.json"),
    join5(__dirname, "..", "ai", "component-registry.json"),
    join5(__dirname, "ai", "component-registry.json")
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
  const __dirname = dirname4(fileURLToPath4(import.meta.url));
  const possiblePaths = [
    join5(__dirname, "..", "..", "blocks-source"),
    join5(__dirname, "..", "blocks-source"),
    join5(__dirname, "blocks-source"),
    // Fallback to old location for backwards compatibility during development
    join5(__dirname, "..", "..", "src", "blocks"),
    join5(__dirname, "..", "src", "blocks"),
    join5(__dirname, "src", "blocks")
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
function loadRegistry4() {
  const registryPath = getRegistryPath4();
  const content = readFileSync5(registryPath, "utf-8");
  return JSON.parse(content);
}
async function confirm2(message) {
  const rl = createInterface2({
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
    registry = loadRegistry4();
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
  const targetDir = join5(projectRoot, config.blocksDir);
  if (!existsSync2(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
    console.log(`\u{1F4C1} Created directory: ${config.blocksDir}`);
  }
  const blockExists = block.files.some((file) => {
    const targetPath = join5(targetDir, file);
    return existsSync2(targetPath);
  });
  if (blockExists) {
    console.log(
      `\u26A0\uFE0F  Block '${blockName}' already exists in ${config.blocksDir}`
    );
    const shouldOverwrite = await confirm2("Do you want to overwrite it?");
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
    const targetSubdir = dirname4(targetPath);
    if (!existsSync2(targetSubdir)) {
      mkdirSync(targetSubdir, { recursive: true });
    }
    const content = readFileSync5(sourcePath, "utf-8");
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
  const importPath = join5(config.blocksDir, blockFile).replace(/\\/g, "/");
  console.log(`  import { ${blockName} } from "${importPath}";`);
}

// src/command-line/commands/migrate.ts
var PENDING_MIGRATIONS = {
  text: {},
  color: {}
};
var COLOR_PREFIXES = [
  "bg",
  "border",
  "border-t",
  "border-r",
  "border-b",
  "border-l",
  "border-x",
  "border-y",
  "ring",
  "ring-offset",
  "outline",
  "divide",
  "shadow",
  "accent",
  "caret",
  "fill",
  "stroke",
  "decoration",
  "from",
  "via",
  "to"
];
var TEXT_PREFIXES = ["text"];
function hasPendingMigrations() {
  return Object.values(PENDING_MIGRATIONS.text).some((v) => v !== "") || Object.values(PENDING_MIGRATIONS.color).some((v) => v !== "");
}
function generateClassMap(direction) {
  const classMap = {};
  for (const [oldName, newName] of Object.entries(PENDING_MIGRATIONS.text)) {
    if (!newName) continue;
    const [from, to] = direction === "to-new" ? [oldName, newName] : [newName, oldName];
    for (const prefix of TEXT_PREFIXES) {
      classMap[`${prefix}-${from}`] = `${prefix}-${to}`;
    }
  }
  for (const [oldName, newName] of Object.entries(PENDING_MIGRATIONS.color)) {
    if (!newName) continue;
    const [from, to] = direction === "to-new" ? [oldName, newName] : [newName, oldName];
    for (const prefix of COLOR_PREFIXES) {
      classMap[`${prefix}-${from}`] = `${prefix}-${to}`;
    }
  }
  return classMap;
}
var MIGRATE_HELP = `
Kumo Token Migration Tool (for consumers)

When Kumo releases breaking changes to token names, use this command
to get the rename map for updating your codebase.

USAGE:
  npx @cloudflare/kumo migrate [options]

OPTIONS:
  --json         Output machine-readable JSON (default)
  --classes      Output as class-level mapping (bg-kumo-base -> bg-kumo-base)
  --to-old       Reverse mapping (new names -> old names)
  --help         Show this help message

EXAMPLES:
  # Check if there are pending migrations
  npx @cloudflare/kumo migrate

  # Get class-level mapping for sed/find-replace
  npx @cloudflare/kumo migrate --classes

  # Get JSON for custom codemod
  npx @cloudflare/kumo migrate --json > rename-map.json

USING WITH sed:
  npx @cloudflare/kumo migrate --classes | grep "^bg-\\|^text-" | \\
    while IFS= read -r line; do
      old=$(echo "$line" | awk '{print $1}')
      new=$(echo "$line" | awk '{print $3}')
      find src -name '*.tsx' -exec sed -i '' "s/\\b$old\\b/$new/g" {} +
    done

NOTE:
  If no migrations are pending, you're up to date with the current version.
  Migrations are only needed when upgrading to a new major/minor version
  that includes breaking token name changes.
`;
function migrate(args) {
  const showHelp = args.includes("--help") || args.includes("-h");
  const outputClasses = args.includes("--classes");
  const toOld = args.includes("--to-old");
  if (showHelp) {
    console.log(MIGRATE_HELP.trim());
    return;
  }
  if (!hasPendingMigrations()) {
    console.log("No pending token migrations.");
    console.log("\nYour codebase is up to date with the current Kumo version.");
    console.log("Token migrations are only needed when upgrading to versions");
    console.log("that include breaking changes to token names.");
    return;
  }
  const direction = toOld ? "to-old" : "to-new";
  const classMap = generateClassMap(direction);
  if (outputClasses) {
    const maxKeyLen = Math.max(...Object.keys(classMap).map((k) => k.length));
    console.log(`# Kumo Token Migration (${direction})`);
    console.log(`# ${Object.keys(classMap).length} class mappings
`);
    for (const [from, to] of Object.entries(classMap)) {
      console.log(`${from.padEnd(maxKeyLen)} -> ${to}`);
    }
    return;
  }
  const output = {
    meta: {
      description: "Kumo token class name migration map",
      direction,
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    },
    tokens: PENDING_MIGRATIONS,
    classes: classMap
  };
  console.log(JSON.stringify(output, null, 2));
}

// src/command-line/commands/ai.ts
import { readFileSync as readFileSync6 } from "node:fs";
import { dirname as dirname5, join as join6 } from "node:path";
import { fileURLToPath as fileURLToPath5 } from "node:url";
function ai() {
  const __dirname = dirname5(fileURLToPath5(import.meta.url));
  const usagePath = join6(__dirname, "..", "..", "ai", "USAGE.md");
  try {
    const content = readFileSync6(usagePath, "utf-8");
    console.log(content);
  } catch {
    console.error(
      "Could not read ai/USAGE.md. Make sure you are running this from an installed @cloudflare/kumo package."
    );
    process.exit(1);
  }
}

// src/command-line/cli.ts
var HELP = `
Kumo CLI - Component registry and blocks distribution

BLOCKS:
  kumo init            Initialize kumo.json configuration file
  kumo blocks          List all available blocks for CLI installation
  kumo add <block>     Install a block to your project

COMPONENT REGISTRY:
  kumo ls              List all Kumo components with categories
  kumo doc <name>      Get detailed documentation for a component
  kumo docs            Get documentation for all components

MIGRATION:
  kumo migrate         Export token rename map for codebase migration
  kumo migrate --classes  Show class-level mappings (bg-kumo-base -> bg-kumo-base)
  kumo migrate --help     Show migration help

AI:
  kumo ai              Print the AI usage guide (component API reference)

GENERAL:
  kumo help            Show this help message

Examples:
  kumo init
  kumo blocks
  kumo add PageHeader
  kumo ls
  kumo doc Button
  kumo docs
  kumo migrate --json > rename-map.json
`;
async function main() {
  const args = process.argv.slice(2);
  const command = args[0]?.toLowerCase();
  switch (command) {
    case "init":
      await init();
      break;
    case "blocks":
      blocks();
      break;
    case "add":
      await add(args[1]);
      break;
    case "ls":
      ls();
      break;
    case "doc":
    case "docs":
      doc(args[1]);
      break;
    case "migrate":
      migrate(args.slice(1));
      break;
    case "ai":
      ai();
      break;
    case "help":
    case "--help":
    case "-h":
    case void 0:
      console.log(HELP.trim());
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.log(HELP.trim());
      process.exit(1);
  }
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
