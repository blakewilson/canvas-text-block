/**
 * @jest-environment jsdom
 */

import CanvasTextBlock from "../src/CanvasTextBlock";

test("it should fragment a word larger than the max width of the text block", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  const text =
    "This is my text withalongwordthatiswiderthanthewidthofthecanvas. This test should fragment and hyphenate the word.";
  const expectedLines = [
    "This is my text",
    "withalongwordthatisw-",
    "iderthanthewidthofthe-",
    "canvas. This test",
    "should fragment and",
    "hyphenate the word.",
  ];

  const instance = new CanvasTextBlock(canvas, 0, 0, 500, 500, {
    fontSize: 50,
  });
  const lines = (instance as any).getLinesFromText(text);

  expect(lines).toStrictEqual(expectedLines);
});

test("it should remove lines that go over the region width/height specified", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  const text = "This is my text";
  const expectedLines = ["This is", "my text"];

  const instance = new CanvasTextBlock(canvas, 0, 0, 500, 500, {
    fontSize: 125,
  });
  const lines = (instance as any).getLinesFromText(text);

  expect(lines).toStrictEqual(expectedLines);
});

test("it should add an ellipsis at the very last line", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  const text =
    "this is my very long text block. This text block should be prefixed with a set of ellipsis";
  const expectedLines = ["this is my", "very long..."];

  const instance = new CanvasTextBlock(canvas, 0, 0, 500, 250, {
    fontSize: 100,
  });

  const lines = (instance as any).getLinesFromText(text);

  expect(lines).toStrictEqual(expectedLines);
});

test("it should not add ellipsis to text not long enough for ellipsis", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  const text = "This text should not run over";
  const expectedLines = ["This text", "should not", "run over"];

  const instance = new CanvasTextBlock(canvas, 0, 0, 500, 500, {
    fontSize: 100,
  });

  const lines = (instance as any).getLinesFromText(text);

  expect(lines).toStrictEqual(expectedLines);
});

test("it should not remove lines since overflow is turned on", () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;

  const text =
    "this is my very long text block. This text block should be prefixed with a set of ellipsis";
  const expectedLines = [
    "this is my",
    "very long",
    "text block.",
    "This text",
    "block",
    "should be",
    "prefixed",
    "with a set",
    "of ellipsis",
  ];

  const instance = new CanvasTextBlock(canvas, 0, 0, 500, 250, {
    fontSize: 100,
    overflow: true,
  });

  const lines = (instance as any).getLinesFromText(text);

  expect(lines).toStrictEqual(expectedLines);
});
