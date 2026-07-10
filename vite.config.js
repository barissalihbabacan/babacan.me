import { defineConfig, lazyPlugins } from "vite-plus";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  plugins: lazyPlugins(() => [react(), tailwindcss()]),
  root: "src",
  build: {
    outDir: "../public",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/index.html",
        notfound: "src/404.html",
      },
    },
  },
});
