/// <reference lib="webworker" />

// to understand the meaning of all variables or the algorithm itself, go to the angular component

let canvas: any;
let ctx: any;
let font: string;
let yArr: number[];
let charWidth: number;
let frame: number = 0;
let msg: string;
let msgLenPx: number;
let nFrames: number;
let img: ImageBitmap | null = null;

const benjaminGuzman: string = "Benjamín Guzmán";
const benjaminGuzmanFont: string = "15pt monospace normal";
let benjaminGuzmanLenPx: number;

let intervalId: any;

function draw() {
  // Draw a semitransparent black rectangle on top of previous drawing
  // this will be drawn on top of the previous character, which will give the sense of the previous character being dimmed out
  ctx.fillStyle = "#00000011";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // color and font for text
  ctx.fillStyle = "#00ff00";
  ctx.font = font;

  // for each column put a random character at the end
  yArr.forEach((y, i) => {
    const rand = Math.random();
    const char = String.fromCharCode(rand * (127 - 33 + 1) + 33);

    const x = i * charWidth;

    ctx.fillText(char, x, y);

    if (y > 100 + rand * 10000) // randomly reset the end of the column if it's at least 100px high
      yArr[i] = 0;
    else // otherwise, just move the y coordinate for the column charWidth px down
      yArr[i] = y + charWidth;
  });

  // add a small animation with the dots ...
  if (frame % 5 == 0) { // modulo 5 to execute the code not on every call 'cause that doesn't look good
    if (msg.endsWith("..."))
      msg = msg.slice(0, msg.length - 3);
    else
      msg += '.';
  }

  // draw the rectangle containing the message
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#ffffff";
  ctx.beginPath();
  ctx.rect(
    canvas.width / 2 - msgLenPx / 2 - 20,
    canvas.height / 2 - charWidth / 2 - 10,
    20 + msgLenPx + 20,
    10 + charWidth + 10
  );
  ctx.fill();
  ctx.stroke();

  // draw the message inside the rectangle
  ctx.fillStyle = "#00ff00";
  ctx.font = font;
  ctx.fillText(
    msg,
    canvas.width / 2 - msgLenPx / 2,
    canvas.height / 2 + charWidth / 2 - 4 // -4 is just a hard-coded value
  );

  // draw the profile pic and name
  if (img) {
    ctx.drawImage(img, canvas.width / 2 - 32, canvas.height / 2 - 64 - 40, 64, 64);

    // it looks better just with the image
    // ctx.fillStyle = "#00ff00";
    // ctx.font = benjaminGuzmanFont;
    // ctx.fillText(benjaminGuzman, canvas.width / 2 - benjaminGuzmanLenPx / 2, canvas.height / 2 - 40);
  }

  ++frame;

  console.log(frame, nFrames);
  if (frame < nFrames) {
    // requestAnimationFrame(draw);
    self.postMessage({type: "ITERATION", frame: frame});
  } else {
    clearInterval(intervalId);
    img?.close();
    self.postMessage({type: "END"});
  }
}

addEventListener("message", ({ data }) => {
  if (data.type === "CONFIG") {
    font = data.font;
    yArr = data.y;
    charWidth = data.charWidth;
    canvas = data.canvas;
    msg = data.msg;
    nFrames = data.nFrames;

    ctx = canvas.getContext("2d");
    ctx.font = font;
    msgLenPx = ctx.measureText(msg).width;

    ctx.font = benjaminGuzmanFont;
    benjaminGuzmanLenPx = ctx.measureText(benjaminGuzman).width;

    fetch("/assets/profile.webp")
      .then(response => response.blob())
      .then(blob => createImageBitmap(blob))
      .then(imgBitmap => img = imgBitmap);

    // requestAnimationFrame(draw);
    intervalId = setInterval(draw, data.refreshRate);
  }
});
