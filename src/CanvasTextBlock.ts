import { CanvasTextBlockOptions } from "./types";
import composeFontString from "./utils/composeFontString";
import calculateNextLineYPos from "./utils/calculateNextLineYPos";
import appendEllipsisToLine from "./utils/appendEllipsisToLine";
import defaultOptions from "./definitions/defaultConfig";
import WidthLargerThanCanvasWidthError from "./errors/WidthLargerThanCanvasWidthError";
import HeightLargerThanCanvasHeightError from "./errors/HeightLargerThanCanvasHeightError";
import XPositionOutOfRange from "./errors/XPositionOutOfRange";
import YPositionOutOfRange from "./errors/YPositionOutOfRange";

class CanvasTextBlock {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private options: CanvasTextBlockOptions;

  constructor(
    canvas: HTMLCanvasElement,
    x: number,
    y: number,
    width: number,
    height: number,
    _options?: Partial<CanvasTextBlockOptions>
  ) {
    this.canvas = canvas;

    const _context = this.canvas.getContext("2d");

    if (!_context) {
      throw new Error("context required");
    }

    this.context = _context;

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
      throw new XPositionOutOfRange();
    }

    if (this.y < 0 || this.y > this.canvas.height) {
      throw new YPositionOutOfRange();
    }

    if (_options?.fontSize && !_options.lineHeight) {
      // If the font size is provided without a line height, set it to 1.25
      _options.lineHeight = _options.fontSize * 1.25;
    }

    this.options = { ...defaultOptions, ..._options };
  }

  /**
   * Get the max width of the text block.
   */
  private getTextBlockMaxWidth = () => {
    return this.width;
  };

  /**
   * Get the max amount of lines possible in the text block.
   */
  private getMaxLineCount = (): number => {
    return Math.floor(this.height / this.options.lineHeight);
  };

  /**
   * Set the text in the text block region.
   */
  setTextBlock = (text: string) => {
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

    // Clip the amount of lines to render depending on the overflow value
    if (!this.options.overflow) {
      lines = lines.slice(0, this.getMaxLineCount());

      // Add ellipsis to the last line if needed
      if (this.options.ellipsis) {
        let lastLine = appendEllipsisToLine(
          this.context,
          lines[lines.length - 1],
          this.width
        );

        lines[lines.length - 1] = lastLine;
      }
    }

    return lines;
  };
}

export default CanvasTextBlock;
