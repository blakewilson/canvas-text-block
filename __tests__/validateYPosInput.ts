import CanvasTextBlock from "../src/CanvasTextBlock";

test("it should fail with an y position larger than the canvas size", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  try {
    const instance = new CanvasTextBlock(canvas, 300, 1500, 100, 100);

    expect(true).toBe(false);
  } catch (err) {
    expect(err.name).toBe("YPositionOutOfRange");
  }
});

test("it should fail with a negative y position", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  try {
    const instance = new CanvasTextBlock(canvas, 300, -1500, 100, 100);

    expect(true).toBe(false);
  } catch (err) {
    expect(err.name).toBe("YPositionOutOfRange");
  }
});
