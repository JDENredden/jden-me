import * as path from "https://deno.land/std/path/mod.ts";
import { walk } from "https://deno.land/std/fs/walk.ts";

const blogDir = "./content/blog";
const imageRegex = /{%\s*image\s*"\/img\/(?!20\d{2}\/\d{2}\/)([^"]+)"\s*,\s*"([^"]+)"\s*%}/g;

async function verifyImage(imgPath) {
  try {
    await Deno.stat(`./public${imgPath}`);
    return true;
  } catch {
    return false;
  }
}

async function updateImagePaths(filePath) {
  const content = await Deno.readTextFile(filePath);
  
  // Extract year and month from filename
  const match = path.basename(filePath).match(/^(\d{4})-(\d{2})/);
  if (!match) return;
  
  const [_, year, month] = match;
  
  // Find all images
  const matches = [...content.matchAll(imageRegex)];
  let updatedContent = content;
  
  // Process each match
  for (const [fullMatch, imgPath, alt] of matches) {
    const newPath = `/img/${year}/${month}/${imgPath}`;
    const exists = await verifyImage(newPath);
    if (!exists) {
      console.log(`Warning: Image not found at ${newPath} in ${filePath}`);
      continue;
    }
    updatedContent = updatedContent.replace(
      fullMatch,
      `{% image "${newPath}", "${alt}" %}`
    );
  }
  
  if (content !== updatedContent) {
    console.log(`Updating ${filePath}`);
    await Deno.writeTextFile(filePath, updatedContent);
  }
}

// Find and process all markdown files
for await (const entry of walk(blogDir, { exts: [".md"] })) {
  await updateImagePaths(entry.path);
}
