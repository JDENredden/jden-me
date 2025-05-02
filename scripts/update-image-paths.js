import { walk } from "https://deno.land/std/fs/mod.ts";

async function updateImagePaths() {
  const blogDir = "./content/blog";
  
  for await (const entry of walk(blogDir, { exts: [".md"] })) {
    if (!entry.isFile) continue;
    
    const content = await Deno.readTextFile(entry.path);
    const date = entry.name.substring(0, 10); // YYYY-MM-DD
    const [year, month] = date.split('-');
    
    // Update image paths to include year/month
    const updatedContent = content.replace(
      /{% image "\/img\/([^"]+)"([^%]+)%}/g,
      `{% image "/img/${year}/${month}/$1"$2%}`
    );
    
    if (content !== updatedContent) {
      await Deno.writeTextFile(entry.path, updatedContent);
      console.log(`Updated: ${entry.path}`);
    }
  }
}

await updateImagePaths();
