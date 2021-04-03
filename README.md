# canvas-text-block

Easily render a wrapping block of text in a HTML Canvas Element.

## Motivation

- There are ways to render lines of text in canvas, but not a wrapping text block. This solves this problem.
- There are some packages out there that do this, but this implementation also adds the ability to specify the `lineHeight` and other configurations.

## Usage

### Installation

Install the package:

```bash
npm install canvas-text-block
```

### Usage

```js
// Create your canvas
const canvas = document.createElement("canvas");
canvas.width = 1000;
canvas.height = 1000;

// Init the package.
const canvasTextBlock = new CanvasTextBlock(canvas, 100, 100, 800, 800);

// Set the text
canvasTextBlock.setTextBlock(
  "This text block will be rendered in the region specified in the constructor above"
);
```
