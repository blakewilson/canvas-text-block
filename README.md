# canvas-text-block

![Example image generated with canvas-text-block](/img/example-canvas.png)

Easily render a wrapping block of text in an HTML Canvas Element or [Node Canvas](https://www.npmjs.com/package/canvas)

## Motivation

- There are ways to render individual lines of text in [canvas](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement), but not a wrapping text block. This package solves this problem.
- There are some packages out there that do this in a way, but this implementation adds the ability to specify the `lineHeight` and other styling configurations.

## Usage

### Installation

Install the package:

```bash
npm install canvas-text-block
```

### Importing

You can import the package as a module:

```bash
import CanvasTextBlock from 'canvas-text-block'
```

Or as CommonJS:

```bash
const CanvasTextBlock = require('canvas-text-block')
```

Additionally, there is a UMD build (`/dist/CanvasTextBlock.js`) for use in the browser:

```html
<script src="node_modules/canvas-text-block/dist/CanvasTextBlock.js">
```

It is recommended to use something like [Gulp](https://gulpjs.com/) or [Browserify](http://browserify.org/) if you intend on using Canvas Text Block in the browser.

### Usage

```js
import CanvasTextBlock from 'canvas-text-block'

...

// Create your canvas
const canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 1000;

const options = {
  fontSize: 50,
}

// Init the package.
const textBlock = new CanvasTextBlock(
  canvas, // An HTML Canvas Element
  100, // The x position of the canvas where the text block should start
  100, // The y position of the canvas where the text block should start
  800, // The width of the text block
  800, // The height of the text block
  options // An optional options config object
);

// Set the text
textBlock.setText(
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
  padding: 50, // The padding around the text box in pixels
  backgroundColor: "transparent", // Set a background color for the text block
  weight: "normal", // Set the font weight
  overflow: false, // Should the package overflow lines that do not fit in the text block
  ellipsis: true, // If overflow is off, should the last word of the text block have an ellipsis?
};
```

## Examples

For examples, please take a look in the [`examples`](https://github.com/blakewilson/canvas-text-block/tree/master/examples) directory.

## License

This project is licensed under the [MIT license](https://github.com/blakewilson/canvas-text-block/blob/master/LICENSE).
