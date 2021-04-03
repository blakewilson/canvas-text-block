const calculateNextLineYPos = (
  yPos: number,
  LineActualBoundingBoxAscent: number,
  lineHeight: number,
  index: number
) => {
  return yPos + LineActualBoundingBoxAscent / 2 + lineHeight * index;
};

export default calculateNextLineYPos;
