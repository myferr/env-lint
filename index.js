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
  .parse(process.argv);

const options = program.opts();

lintEnv(options).catch((err) => {
  console.error(chalk.red("Error:"), err.message);
  process.exit(1);
});
