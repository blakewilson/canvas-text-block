import { createCanvas } from "canvas";
import CanvasTextBlock from "../../../src/CanvasTextBlock";
import { readFileSync } from "fs";
import path from "path";

test("it should generate a canvas text block with padding", () => {
  const canvas = createCanvas(500, 500);

  const textBlock = new CanvasTextBlock(canvas, 100, 100, 300, 300, {
    fontSize: 40,
    padding: 20,
    backgroundColor: "#fff",
    color: "#000",
  });
  textBlock.setText("This is a message");

  const compareFile = readFileSync(path.resolve(__dirname, "paddingTest.png"));

  const compare = Buffer.compare(compareFile, canvas.toBuffer());

  expect(compare).toBe(0);
});
