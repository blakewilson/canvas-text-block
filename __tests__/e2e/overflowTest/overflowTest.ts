import { createCanvas } from "canvas";
import CanvasTextBlock from "../../../src/CanvasTextBlock";
import { writeFileSync, readFileSync } from "fs";
import path from "path";

test("it should generate a canvas text block with lines overflowing", () => {
  const canvas = createCanvas(500, 500);

  const textBlock = new CanvasTextBlock(canvas, 100, 100, 300, 300, {
    backgroundColor: "red",
    color: "white",
    fontSize: 40,
    overflow: true,
  });
  textBlock.setText(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur facilisis metusut eleifend tincidunt. Donec"
  );

  const compareFile = readFileSync(path.resolve(__dirname, "overflowTest.png"));

  const compare = Buffer.compare(compareFile, canvas.toBuffer());

  expect(compare).toBe(0);
});
