import { walk } from "https://deno.land/std/fs/walk.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";
import { copy } from "https://deno.land/std/fs/copy.ts";
import { join, dirname } from "https://deno.land/std/path/mod.ts";

const CONTENT_DIR = new URL("../content", import.meta.url);
const PUBLIC_IMG_DIR = new URL("../public/img", import.meta.url);

// Ensure the public/img directory exists
await ensureDir(PUBLIC_IMG_DIR);

// Process all markdown files
for await (const entry of walk(CONTENT_DIR, { 
  match: [/\.md$/],
  skip: [/_site/, /node_modules/]
})) {
  const content = await Deno.readTextFile(entry.path);
  
  // Find all markdown images
  const imageRegex = /!\[(.*?)\]\((\/content\/images\/.*?)\)/g;
  let newContent = content;
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    const [fullMatch, alt, oldPath] = match;
    // Get just the filename from the path
    const filename = oldPath.split("/").pop();
    const newPath = `/img/${filename}`;
    
    // Copy the image file if it exists
    try {
      const oldFullPath = join(dirname(CONTENT_DIR), oldPath);
      const newFullPath = join(PUBLIC_IMG_DIR, filename);
      await copy(oldFullPath, newFullPath, { overwrite: true });
      
      // Replace markdown image with shortcode
      const shortcode = `{% image "${newPath}", "${alt || ''}" %}`;
      newContent = newContent.replace(fullMatch, shortcode);
    } catch (err) {
      console.error(`Failed to process image: ${oldPath}`, err);
    }
  }

  // Only write the file if we made changes
  if (newContent !== content) {
    await Deno.writeTextFile(entry.path, newContent);
    console.log(`Updated ${entry.path}`);
  }
}
