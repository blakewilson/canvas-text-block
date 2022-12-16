/**
 * @jest-environment jsdom
 */

import CanvasTextBlock from "../src/CanvasTextBlock";

const canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 1000;

test("it should validate the padding config", () => {
  const xPos = 0;
  const yPos = 0;
  const widthHeight = 500;
  const padding = 50;

  const instance = new CanvasTextBlock(
    canvas,
    xPos,
    yPos,
    widthHeight,
    widthHeight,
    {
      padding: padding,
    }
  );

  expect((instance as any).getTextBlockMaxWidth()).toEqual(
    widthHeight - padding * 2
  );

  expect((instance as any).getStartingLineXPos()).toEqual(xPos + padding);

  expect((instance as any).getStartingLineYPos()).toEqual(yPos + padding);
});
