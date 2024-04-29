/**
 * @jest-environment jsdom
 */

import CanvasTextBlock from "../src/CanvasTextBlock";

test("it should fail with a text block height larger than the canvas", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  try {
    const instance = new CanvasTextBlock(canvas, 0, 0, 500, 1200);

    expect(true).toBe(false);
  } catch (err) {
    expect((err as any).name).toBe("HeightLargerThanCanvasHeightError");
  }
});
