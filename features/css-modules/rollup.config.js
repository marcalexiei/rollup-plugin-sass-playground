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
      processor: async (styles) => {
        let scopedClassNames = {};
        const postcssProcessResult = await postcss([
          postcssModules({
            getJSON: (_, json) => {
              if (json) scopedClassNames = json;
            },
          }),
        ]).process(styles, {
          from: undefined,
        });

        console.info("processor", scopedClassNames);
        console.info("processor", {
          ...scopedClassNames,
          css: postcssProcessResult.css,
        });

        return { ...scopedClassNames, css: postcssProcessResult.css };
      },
    }),
  ],
});
