const { LoremIpsum } = require("lorem-ipsum");
const { createCanvas } = require("canvas");
const CanvasTextBlock = require("canvas-text-block");
const { writeFileSync } = require("fs");

const lorem = new LoremIpsum();

const width = 1000;
const height = 1000;

// Create a canvas with Node Canvas
const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

// Set a background of the entire canvas
context.fillStyle = "red";
context.fillRect(0, 0, width, height);

// Create a Canvas Text Block instance
const textBlock = new CanvasTextBlock(canvas, 100, 100, 800, 800, {
  fontSize: 50,
  backgroundColor: "#fff",
  color: "#000",
});

// Generate some dummy text from lorem ipsum
const text = lorem.generateSentences(5);

// Set the text
textBlock.setText(text);

// Save the Canvas buffer as an image
writeFileSync("canvasAsImage.png", canvas.toBuffer());
