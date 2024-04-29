import pck from "./package.json" assert { type: "json" };
import typescript from '@rollup/plugin-typescript'

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
  ],
};
