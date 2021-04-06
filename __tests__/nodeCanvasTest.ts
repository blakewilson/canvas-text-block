import { createCanvas } from "canvas";
import CreateTextBlock from "../src/CanvasTextBlock";

test("it should work with Node Canvas", () => {
  const canvas = createCanvas(1000, 1000);

  const instance = new CreateTextBlock(canvas, 100, 100, 800, 800);
  instance.setTextBlock("This is the text block message");
});
