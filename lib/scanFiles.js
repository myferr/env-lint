import fg from "fast-glob";
import fs from "fs";

export async function findEnvUsages(srcDir) {
  const entries = await fg([`${srcDir}/**/*.{js,jsx}`]);
  const usedVars = new Set();

  for (const file of entries) {
    const content = fs.readFileSync(file, "utf8");
    const matches = content.match(/process\.env\.([A-Z0-9_]+)/g);
    if (matches) {
      matches.forEach((m) => usedVars.add(m.split(".")[2]));
    }
  }

  return Array.from(usedVars);
}
