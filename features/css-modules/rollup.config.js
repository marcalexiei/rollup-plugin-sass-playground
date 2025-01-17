import { defineConfig } from "rollup";
import sass from "rollup-plugin-sass";
import postcss from "postcss";
import postcssModules from "postcss-modules";

export default defineConfig({
  input: ["src/entryA.js", "src/entryB.js"],
  output: {
    dir: "dist",
    preserveModules: true,
  },
  plugins: [
    sass({
      insert: true,
      api: "modern",
      processor: async (styles, id) => {
        let cssModules = {};
        const postcssProcessResult = await postcss([
          postcssModules({
            getJSON: (_, json) => {
              if (json) cssModules = json;
            },
          }),
        ]).process(styles, { from: id });

        return {
          css: postcssProcessResult.css,
          cssModules: cssModules,
        };
      },
    }),
  ],
});
