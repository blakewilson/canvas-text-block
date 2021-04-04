class YPositionOutOfRangeError extends Error {
  constructor() {
    super();
    this.message = "The y position specified is out of range";
    this.name = "YPositionOutOfRangeError";
  }
}

export default YPositionOutOfRangeError;
