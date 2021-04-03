class HeightLargerThanCanvasHeightError extends Error {
  constructor() {
    super();

    this.message =
      "The specified height can not be larger than the canvas height";
    this.name = "HeightLargerThanCanvasHeightError";
  }
}

export default HeightLargerThanCanvasHeightError;
