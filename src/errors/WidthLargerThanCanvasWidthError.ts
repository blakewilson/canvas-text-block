class WidthLargerThanCanvasWidthError extends Error {
  constructor() {
    super();

    this.message =
      "The specified width can not be larger than the canvas width";
    this.name = "WidthLargerThanCanvasWidthError";
  }
}

export default WidthLargerThanCanvasWidthError;
