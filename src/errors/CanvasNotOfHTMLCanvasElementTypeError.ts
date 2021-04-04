class CanvasNotOfHTMLCanvasElementTypeError extends Error {
  constructor() {
    super();
    this.message = "The canvas provided is not of type HTMLCanvasElement";
    this.name = "CanvasNotOfHTMLCanvasElementTypeError";
  }
}

export default CanvasNotOfHTMLCanvasElementTypeError;
