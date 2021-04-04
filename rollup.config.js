import { babel } from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import { DEFAULT_EXTENSIONS } from "@babel/core";

const input = "./src/CanvasTextBlock.ts";
const fileName = "CanvasTextBlock";

export default {
  input,
  output: [
    {
      name: "CanvasTextBlock",
      file: `dist/${fileName}.js`,
      format: "umd",
    },
    {
      file: `dist/${fileName}.common.js`,
      format: "cjs",
      exports: "auto",
    },
    {
      file: `dist/${fileName}.esm.js`,
      format: "esm",
    },
  ],
  plugins: [
    typescript(),
    babel({
      babelHelpers: "bundled",
      extensions: [...DEFAULT_EXTENSIONS, ".ts"],
    }),
  ],
};
