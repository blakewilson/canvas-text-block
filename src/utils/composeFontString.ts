/**
 * https://developer.mozilla.org/en-US/docs/Web/CSS/font
 */
const composeFontString = (
  fontSize: number,
  fontFamily: string,
  weight: string
) => {
  return `${weight} ${fontSize}px ${fontFamily}`;
};

export default composeFontString;
