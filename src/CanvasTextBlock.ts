import type {
  Canvas as NodeCanvas,
  CanvasRenderingContext2D as NodeCanvasRenderingContext2D,
} from "canvas";
import composeFontString from "./utils/composeFontString";
import calculateNextLineYPos from "./utils/calculateNextLineYPos";
import appendEllipsisToLine from "./utils/appendEllipsisToLine";
import defaultOptions from "./definitions/defaultConfig";
import WidthLargerThanCanvasWidthError from "./errors/WidthLargerThanCanvasWidthError";
import HeightLargerThanCanvasHeightError from "./errors/HeightLargerThanCanvasHeightError";
import XPositionOutOfRangeError from "./errors/XPositionOutOfRangeError";
import YPositionOutOfRangeError from "./errors/YPositionOutOfRangeError";
import CanvasContextIsNullError from "./errors/CanvasContextIsNullError";

export type CanvasTextBlockOptions = {
  color?: string;
  backgroundColor?: string;
  fontFamily?: string;
  fontSize?: number;
  lineHeight?: number;
  padding?: number;
  weight?: string;
  ellipsis?: boolean;
  overflow?: boolean;
}

export default class CanvasTextBlock {
  private canvas: HTMLCanvasElement | NodeCanvas;
  private context: CanvasRenderingContext2D | NodeCanvasRenderingContext2D;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private options: Required<CanvasTextBlockOptions>;

  constructor(
    canvas: HTMLCanvasElement | NodeCanvas,
    x: number,
    y: number,
    width: number,
    height: number,
    options?: CanvasTextBlockOptions
  ) {
    this.canvas = canvas;

    const _context = this.canvas.getContext("2d");

    if (!_context) {
      throw new CanvasContextIsNullError();
    }

    this.context = _context as
      | CanvasRenderingContext2D
      | NodeCanvasRenderingContext2D;

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    if (this.width > this.canvas.width) {
      throw new WidthLargerThanCanvasWidthError();
    }

    if (this.height > this.canvas.height) {
      throw new HeightLargerThanCanvasHeightError();
    }

    if (this.x < 0 || this.x > this.canvas.width) {
      throw new XPositionOutOfRangeError();
    }

    if (this.y < 0 || this.y > this.canvas.height) {
      throw new YPositionOutOfRangeError();
    }

    if (options?.fontSize && !options.lineHeight) {
      // If the font size is provided without a line height, set it to 1.25
      options.lineHeight = options.fontSize * 1.25;
    }

    this.options = { ...defaultOptions, ...options };

    if (this.options.backgroundColor !== "transparent") {
      this.setBackgroundColor();
    }
  }

  private getTextBlockMaxWidth = () => {
    let maxWidth = this.width;

    if (this.options.padding !== 0) {
      maxWidth = maxWidth - this.options.padding * 2;
    }

    return maxWidth;
  };

  private getOptions = () => {
    return this.options;
  };

  private getMaxLineCount = (): number => {
    let height = this.height;

    if (this.options.padding !== 0) {
      height = height - this.options.padding * 2;
    }

    return Math.floor(height / this.options.lineHeight);
  };

  private setBackgroundColor = () => {
    if (this.options.backgroundColor !== "transparent") {
      this.context.fillStyle = this.options.backgroundColor;
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }
  };

  private getStartingLineXPos = () => {
    let xPos = this.x;

    if (this.options.padding !== 0) {
      xPos = this.x + this.options.padding;
    }

    return xPos;
  };

  private getStartingLineYPos = () => {
    let yPos = this.y;

    if (this.options.padding !== 0) {
      yPos = this.y + this.options.padding;
    }

    return yPos;
  };

  setText = (text: string) => {
    const lines = this.getLinesFromText(text);

    // Loop through each line and render then to the canvas.
    lines.map((line, index) => {
      this.context.fillStyle = this.options.color;
      this.context.font = composeFontString(
        this.options.fontSize,
        this.options.fontFamily,
        this.options.weight
      );

      /**
       * TODO: I'd like to be able to define the text align in settings,
       * but more work needs to be done here before that can happen.
       */
      this.context.textAlign = "left";
      this.context.textBaseline = "top";

      const textMeasurements = this.context.measureText(line);

      /**
       * Render each line on the x,y cords based on the line index, line height
       * font size, etc.
       */
      this.context.fillText(
        line,
        this.getStartingLineXPos(),
        calculateNextLineYPos(
          this.getStartingLineYPos(),
          textMeasurements.actualBoundingBoxAscent,
          this.options.lineHeight,
          index
        )
      );
    });
  };

  private getLinesFromText = (text: string) => {
    const words = text.split(" ");

    // Find all words with new lines and make them their own word.
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].includes("\n")) {
        let newWords = words[i].split(/(\n)/g);
        words.splice(i, 1, ...newWords);

        i = i + newWords.length - 1;
      }
    }

    let lines: string[] = [];
    let currentLine = words[0];

    // Loop through each word and build lines for the text block
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      this.context.font = composeFontString(
        this.options.fontSize,
        this.options.fontFamily,
        this.options.weight
      );

      // If the word is a new line, append a new line.
      if (word === "\n") {
        lines.push(currentLine);
        currentLine = "";

        continue;
      }

      const currentLineWithWordWidth = this.context.measureText(
        `${currentLine} ${word}`
      ).width;

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

        // If the word is wider than the block width, break it up into fragments
        const wordLength = this.context.measureText(word).width;
        if (wordLength > this.width) {
          let fragments = [];
          let currentFragment = "";
          let splitWord = word.split("");

          for (let i = 0; i < splitWord.length; i++) {
            const currentFragmentWidth = this.context.measureText(
              `${currentFragment}${splitWord[i]}-`
            ).width;

            if (currentFragmentWidth > this.getTextBlockMaxWidth()) {
              fragments.push(`${currentFragment}-`);
              currentFragment = splitWord[i];
            } else {
              currentFragment += splitWord[i];
            }
          }

          lines.push(...fragments);

          currentLine = currentFragment;
        } else {
          currentLine = word;
        }
      }
    }

    lines.push(currentLine);

    if (lines.length > this.getMaxLineCount()) {
      // Clip the amount of lines to render depending on the overflow value
      if (!this.options.overflow) {
        lines = lines.slice(0, this.getMaxLineCount());

        // Add ellipsis to the last line if needed
        if (this.options.ellipsis && lines.length >= this.getMaxLineCount()) {
          let lastLine = appendEllipsisToLine(
            this.context as CanvasRenderingContext2D,
            lines[lines.length - 1],
            this.width
          );

          lines[lines.length - 1] = lastLine;
        }
      }
    }

    return lines;
  };
}

