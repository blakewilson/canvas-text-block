/**
 * @jest-environment jsdom
 */

import CanvasTextBlock from "../src/CanvasTextBlock";

test("it should fail with an x position larger than the canvas size", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  try {
    const instance = new CanvasTextBlock(canvas, 1500, 300, 100, 100);

    expect(true).toBe(false);
  } catch (err) {
    expect((err as any).name).toBe("XPositionOutOfRangeError");
  }
});

test("it should fail with a negative x position", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  try {
    const instance = new CanvasTextBlock(canvas, -1500, 300, 100, 100);

    expect(true).toBe(false);
  } catch (err) {
    expect((err as any).name).toBe("XPositionOutOfRangeError");
  }
});
