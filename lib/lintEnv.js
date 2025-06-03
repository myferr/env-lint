import chalk from "chalk";
import { parseEnvFile } from "./parseEnv.js";
import { findEnvUsages } from "./scanFiles.js";

export async function lintEnv({ env, example, src }) {
  const actual = parseEnvFile(env);
  const expected = parseEnvFile(example);
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

  if (!missingInEnv.length && !missingInExample.length) {
    console.log(chalk.green("✅ env-lint found no issues."));
  }
}
