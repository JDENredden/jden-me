import * as path from "https://deno.land/std/path/mod.ts";
import { walk } from "https://deno.land/std/fs/walk.ts";

const blogDir = "./content/blog";
// This regex extracts image paths from the shortcodes
const imageRegex = /{%\s*image\s*"(\/img\/[^"]+)"\s*,\s*"([^"]+)"\s*%}/g;

async function checkImageExists(imagePath) {
  try {
    await Deno.stat(`./public${imagePath}`);
    return true;
  } catch {
    return false;
  }
}

async function verifyImages(filePath) {
  const content = await Deno.readTextFile(filePath);
  const matches = [...content.matchAll(imageRegex)];
  let allExist = true;
  
  for (const match of matches) {
    const imagePath = match[1];
    const exists = await checkImageExists(imagePath);
    
    if (!exists) {
      console.error(`❌ File ${filePath} references missing image: ${imagePath}`);
      allExist = false;
    }
  }
  
  return allExist;
}

// Find and process all markdown files
let allValid = true;
for await (const entry of walk(blogDir, { exts: [".md"] })) {
  const valid = await verifyImages(entry.path);
  if (!valid) allValid = false;
}

if (allValid) {
  console.log("✅ All referenced images exist in the file system!");
} else {
  console.error("❌ Some images are missing! See details above.");
  Deno.exit(1);
}
