import type { Canvas as NodeCanvas } from "canvas";

export = CanvasTextBlock;

declare class CanvasTextBlock {
  /**
   * Create a text block instance
   *
   * @param canvas The canvas element
   * @param x The x-axis position in pixels where the text block should start
   * @param y The y-axis position in pixels where the text block should start
   * @param width The width of the text block in pixels
   * @param height The height of the text block in pixels
   * @param options
   */
  constructor(
    canvas: HTMLCanvasElement | NodeCanvas,
    x: number,
    y: number,
    width: number,
    height: number,
    options: CanvasTextBlock.CanvasTextBlockOptions
  );

  /**
   * Set the text of the text block instance.
   *
   * @param text
   */
  setText(text: string): void;
}

declare namespace CanvasTextBlock {
  export interface CanvasTextBlockOptions {
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
}
