import CanvasTextBlock from "../src/CanvasTextBlock";

test("it should fail with canvas not of type HTMLCanvasElement", () => {
  try {
    const instance = new (CanvasTextBlock as any)(
      "not a canvas instance",
      0,
      0,
      100,
      100
    );

    expect(true).toBe(false);
  } catch (err) {
    expect(err.name).toBe("CanvasNotOfHTMLCanvasElementTypeError");
  }
});
