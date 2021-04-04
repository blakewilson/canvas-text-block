class CanvasContextIsNullError extends Error {
  constructor() {
    super();
    this.message = "The canvas needs a 2d context!";
    this.name = "CanvasContextIsNullError";
  }
}

export default CanvasContextIsNullError;
