import chalk from "chalk";
import fs from "fs";
import { parseEnvFile } from "./parseEnv.js";
import { findEnvUsages } from "./scanFiles.js";

export async function lintEnv({ env, example, src, fix = false }) {
  const actual = parseEnvFile(fs.readFileSync(env, "utf-8"));
  const expected = parseEnvFile(fs.readFileSync(example, "utf-8"));
  const used = await findEnvUsages(src);

  const actualKeys = Object.keys(actual);
  const expectedKeys = Object.keys(expected);

  const missingInExample = actualKeys.filter(
    (key) => !expectedKeys.includes(key)
  );
  const missingInEnv = expectedKeys.filter((key) => !actualKeys.includes(key));
  const unusedVars = actualKeys.filter((key) => !used.includes(key));

  console.log(
    chalk.yellow(
      `🔍 Checking .env against .env.example and source files in ${src}`
    )
  );
  console.log("");

  if (missingInExample.length) {
    console.log(
      chalk.red("❌ Missing in .env.example:"),
      missingInExample.join(", ")
    );
  }
  if (missingInEnv.length) {
    console.log(chalk.red("❌ Missing in .env:"), missingInEnv.join(", "));
  }
  if (unusedVars.length) {
    console.log(
      chalk.blue("ℹ Possibly unused variables:"),
      unusedVars.join(", ")
    );
  }

  let modified = false;

  if (fix) {
    const envLines = fs.readFileSync(env, "utf-8").split("\n");

    // Add missing vars from example
    for (const key of missingInEnv) {
      envLines.push(`${key}=`);
    }

    // Remove unused vars
    const cleanedLines = envLines.filter((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("="))
        return true;
      const [key] = trimmed.split("=");
      return !unusedVars.includes(key.trim());
    });

    fs.writeFileSync(env, cleanedLines.join("\n"));
    modified = true;
  }

  if (!missingInEnv.length && !missingInExample.length && !unusedVars.length) {
    console.log(chalk.green("✅ env-lint found no issues."));
  }

  return {
    valid: missingInEnv.length === 0 && missingInExample.length === 0,
    fixed: modified,
  };
}
