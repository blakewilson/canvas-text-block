import { createCanvas } from "canvas";
import CanvasTextBlock from "../../../src/CanvasTextBlock";
import { readFileSync } from "fs";
import path from "path";

test("it should generate a canvas text block with specified line height", () => {
  const canvas = createCanvas(500, 500);

  const textBlock = new CanvasTextBlock(canvas, 100, 100, 300, 300, {
    backgroundColor: "red",
    color: "white",
    fontSize: 40,
    lineHeight: 80,
  });
  textBlock.setText("This is a message");

  const compareFile = readFileSync(
    path.resolve(__dirname, "lineHeightTest.png")
  );

  expect(compareFile).toEqual(canvas.toBuffer());
});
