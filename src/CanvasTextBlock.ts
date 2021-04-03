import { CanvasTextBlockOptions } from "./types";
import composeFontString from "./utils/composeFontString";
import calculateNextLineYPos from "./utils/calculateNextLineYPos";

class CanvasTextBlock {
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
  width: number;
  height: number;
  options: CanvasTextBlockOptions;

  constructor(
    context: CanvasRenderingContext2D | null,
    x: number,
    y: number,
    width: number,
    height: number,
    _options?: Partial<CanvasTextBlockOptions>
  ) {
    if (!context) {
      throw new Error("No context");
    }

    this.context = context;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    const defaultOptions: CanvasTextBlockOptions = {
      color: "#fff",
      fontFamily: "arial",
      fontSize: 16,
      lineHeight: 24,
      weight: "normal",
      textAlign: "left",
    };

    this.options = { ...defaultOptions, ..._options };
  }

  private getTextBlockMaxWidth = () => {
    return this.width;
  };

  setTextBlock = (text: string) => {
    const lines = this.getLinesFromText(text);

    lines.map((line, index) => {
      this.context.fillStyle = this.options.color;
      this.context.font = composeFontString(
        this.options.fontSize,
        this.options.fontFamily,
        this.options.weight
      );
      this.context.textAlign = this.options.textAlign;

      // TODO: Need to figure this out
      this.context.textBaseline = "top";

      const textMeasurements = this.context.measureText(line);

      this.context.fillText(
        line,
        this.x,
        calculateNextLineYPos(
          this.y,
          textMeasurements.actualBoundingBoxAscent,
          this.options.lineHeight,
          index
        )
      );
    });
  };

  private getLinesFromText = (text: string) => {
    const words = text.split(" ");

    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].includes("\n")) {
        let newWords = words[i].split(/(\n)/g);
        words.splice(i, 1, ...newWords);

        i = i + newWords.length - 1;
      }
    }

    let lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      this.context.font = composeFontString(
        this.options.fontSize,
        this.options.fontFamily,
        this.options.weight
      );

      const currentLineWithWordWidth = this.context.measureText(
        `${currentLine} ${word}`
      ).width;

      // If the word is a new line, append a new line.
      if (word === "\n") {
        lines.push(currentLine);
        currentLine = "";

        continue;
      }

      // When the current line with the new word is less width than the max width.
      if (currentLineWithWordWidth < this.getTextBlockMaxWidth()) {
        // Append a space before the previous word if the previous
        // word is not a new line.
        if (words[i - 1] && words[i - 1] === "\n") {
          currentLine += word;
        } else {
          currentLine += ` ${word}`;
        }
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }

    lines.push(currentLine);

    return lines;
  };
}

export default CanvasTextBlock;
