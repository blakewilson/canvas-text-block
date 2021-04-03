class YPositionOutOfRange extends Error {
  constructor() {
    super();
    this.message = "The y position specified is out of range";
    this.name = "YPositionOutOfRange";
  }
}

export default YPositionOutOfRange;
