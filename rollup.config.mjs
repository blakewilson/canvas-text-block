import { babel } from "@rollup/plugin-babel";
import pck from "./package.json" assert { type: "json" };
import typescript from "rollup-plugin-typescript2";
import { DEFAULT_EXTENSIONS } from "@babel/core";

const input = "./src/CanvasTextBlock.ts";

export default {
  input,
  output: [
    {
      name: "CanvasTextBlock",
      file: pck.browser,
      format: "umd",
    },
    {
      file: pck.main,
      format: "cjs",
      exports: "auto",
    },
    {
      file: pck.module,
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
