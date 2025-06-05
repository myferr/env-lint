#!/usr/bin/env node

import { Command } from "commander";
import chalk from "chalk";
import { lintEnv } from "./lib/lintEnv.js";

const program = new Command();

program
  .name("env-lint")
  .description("Lint .env files and check for unused or missing variables.")
  .option("-e, --env <path>", "Path to .env file", ".env")
  .option("-x, --example <path>", "Path to .env.example file", ".env.example")
  .option("-s, --src <path>", "Source directory to scan", "src")
  .option("--fix", "Automatically fix missing or unused variables")
  .parse(process.argv);

const options = program.opts();

lintEnv(options)
  .then((result) => {
    if (options.fix && result.fixed) {
      console.log(chalk.green("✅ Fixes applied."));
    } else if (!result.valid) {
      process.exit(1);
    }
  })
  .catch((err) => {
    console.error(chalk.red("Error:"), err.message);
    process.exit(1);
  });
