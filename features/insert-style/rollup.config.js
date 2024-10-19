import { defineConfig } from "rollup";
import sass from "rollup-plugin-sass";

export default defineConfig({
  input: "src/index.js",
  output: {
    dir: "dist",
    preserveModules: true,
  },
  plugins: [sass({ insert: true })],
});
