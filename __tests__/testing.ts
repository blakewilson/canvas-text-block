import CanvasTextBlock from "../src/CanvasTextBlock";
import fs from "fs";
import path from "path";

test("it works", async () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 2000;
  canvas.height = 2000;

  if (context) {
    context.fillStyle = "green";
    context.fillRect(500, 500, 1000, 700);
  }

  const instance = new CanvasTextBlock(context, 500, 500, 1000, 700, {
    fontSize: 100,
    lineHeight: 100 * 1.25,
  });

  instance.setTextBlock(
    "This is my message. Figure out the lines. This will be another line. This is a linewithalongwordwithsomemorechars we'll see how it plays out "
  );

  const dataUrl = canvas.toDataURL();
  const buffer = new Buffer(dataUrl.split(",")[1], "base64");

  fs.writeFileSync("__tests__/testing.png", buffer);
});
