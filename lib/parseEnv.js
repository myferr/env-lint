import fs from "fs";
import dotenv from "dotenv";

export function parseEnvFile(path) {
  if (!fs.existsSync(path)) return {};
  const content = fs.readFileSync(path, "utf-8");
  return dotenv.parse(content);
}
