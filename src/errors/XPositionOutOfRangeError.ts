class XPositionOutOfRangeError extends Error {
  constructor() {
    super();
    this.message = "The x position specified is out of range";
    this.name = "XPositionOutOfRangeError";
  }
}

export default XPositionOutOfRangeError;
