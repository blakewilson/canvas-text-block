import CanvasTextBlock from "../src/CanvasTextBlock";
import fs from "fs";
import path from "path";

test("it works", async () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = 1000;
  canvas.height = 1000;

  if (context) {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, 1000, 1000);

    context.fillStyle = "red";
    context.fillRect(20, 20, 960, 960);
  }

  const instance = new CanvasTextBlock(canvas, 20, 20, 960, 960, {
    color: "#fff",
    fontSize: 120,
  });

  instance.setTextBlock(
    "This is my message. Figure out the lines. This will be another line. This is a linewithalongwordwithsomemorechars we'll see how it plays out "
  );

  const dataUrl = canvas.toDataURL();
  const buffer = new Buffer(dataUrl.split(",")[1], "base64");

  fs.writeFileSync("__tests__/testing.png", buffer);
});
