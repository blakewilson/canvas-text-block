const appendEllipsisToLine = (
  context: CanvasRenderingContext2D,
  line: string,
  lineMaxWidth: number
) => {
  for (let i = 0; i < line.length; i++) {
    let possibleLine = line.substr(0, line.length - i) + "...";
    let possibleLineWidth = context.measureText(possibleLine).width;

    if (possibleLineWidth < lineMaxWidth) {
      return possibleLine;
    }
  }

  throw new Error("Could not add ellipsis");
};

export default appendEllipsisToLine;
