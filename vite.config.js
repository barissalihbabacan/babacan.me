import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";
import tailwindcss from "@tailwindcss/vite";

function getHtmlEntries(dir) {
  const entries = {};
  for (const file of fs.readdirSync(dir)) {
    if (file.endsWith(".html")) {
      const name = file.replace(".html", "");
      entries[name === "index" ? "main" : name] = resolve(dir, file);
    }
  }
  return entries;
}

export default defineConfig({
  plugins: [tailwindcss()],
  root: "src",
  build: {
    outDir: "../public",
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(resolve(__dirname, "src")),
    },
  },
});
