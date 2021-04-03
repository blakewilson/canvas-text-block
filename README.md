# canvas-text-block

Easily render a wrapping block of text in a HTML Canvas Element.

## Motivation

- There are ways to render individual lines of text in [canvas](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement), but not a wrapping text block. This package solves this problem.
- There are some packages out there that do this in a way, but this implementation adds the ability to specify the `lineHeight` and other styling configurations.

## Usage

### Installation

Install the package:

```bash
npm install canvas-text-block
```

### Usage

```js
import CanvasTextBlock from 'canvas-text-block'

...

// Create your canvas
const canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 1000;

// Init the package.
const canvasTextBlock = new CanvasTextBlock(
  canvas, // An HTML Canvas Element
  100, // The x position of the canvas where the text block should start
  100, // The y position of the canvas where the text block should start
  800, // The width of the text block
  800, // The height of the text block
  options // An optional options config object
);

// Set the text
canvasTextBlock.setTextBlock(
  "This text block will be rendered in the region specified in the constructor above"
);
```

### Options

```js
const defaultOptions = {
  color: "#fff", // Set the color of the text block
  fontFamily: "arial", // Set the font family of the text block
  fontSize: 16, // Set the font size in pixels
  lineHeight: 24, // Set the text line height in pixels
  weight: "normal", // Set the font weight
  overflow: false, // Should the package overflow lines that do not fit in the text block
  ellipsis: true, // If overflow is off, should the last word of the text block have an ellipsis?
};
```

## License

This project is licensed under the [MIT license](https://github.com/blakewilson/canvas-text-block/blob/master/LICENSE).