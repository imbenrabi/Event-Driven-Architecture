import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@event-driven-architecture/server": path.resolve(
        __dirname,
        "../server/src"
      ),
    },
  },
});
