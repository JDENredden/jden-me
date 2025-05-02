import * as path from "https://deno.land/std/path/mod.ts";
import { walk } from "https://deno.land/std/fs/walk.ts";

const blogDir = "./content/blog";
// This regex looks for image shortcodes that don't have the year/month structure
const incorrectImageRegex = /{%\s*image\s*"\/img\/(?!20\d{2}\/\d{2}\/)([^"]+)"\s*,\s*"([^"]+)"\s*%}/g;

async function checkImagePaths(filePath) {
  const content = await Deno.readTextFile(filePath);
  
  // Find any incorrect image paths
  const matches = content.match(incorrectImageRegex);
  if (matches && matches.length > 0) {
    console.error(`❌ File ${filePath} has ${matches.length} incorrect image references:`);
    matches.forEach(match => console.error(`   ${match}`));
    return false;
  }
  return true;
}

// Find and process all markdown files
let allValid = true;
for await (const entry of walk(blogDir, { exts: [".md"] })) {
  const valid = await checkImagePaths(entry.path);
  if (!valid) allValid = false;
}

if (allValid) {
  console.log("✅ All image paths have the correct year/month structure!");
} else {
  console.error("❌ Some image paths need to be fixed! See details above.");
  Deno.exit(1);
}
