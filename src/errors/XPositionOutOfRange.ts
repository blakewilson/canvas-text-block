class XPositionOutOfRange extends Error {
  constructor() {
    super();
    this.message = "The x position specified is out of range";
    this.name = "XPositionOutOfRange";
  }
}

export default XPositionOutOfRange;
