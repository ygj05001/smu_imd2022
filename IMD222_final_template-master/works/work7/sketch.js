function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
}

let howManyX = 20;
let howManyY = 20;
let globalRotateAngle = 0;

function draw() {
  background(255);
  globalRotateAngle += degrees(0.0001);
  let tileWidth = width / (howManyX + 1);
  let tileHeight = height / (howManyY + 1);
  for (let tileCntX = 0; tileCntX < howManyX; tileCntX++) {
    for (let tileCntY = 0; tileCntY < howManyY; tileCntY++) {
      let tileCenterX = tileWidth * (tileCntX + 1);
      let tileCenterY = tileHeight * (tileCntY + 1);
      let angleOffsetX = degrees(0.01) * tileCntX;
      let angleOffsetY = degrees(0.01) * tileCntY;
      push();
      translate(tileCenterX, tileCenterY);
      rotate(globalRotateAngle + angleOffsetX + angleOffsetY);
      noFill();
      stroke(250);
      strokeWeight(10);
      line(0 - tileWidth * 0.5 + 5, 0, 0 + tileWidth * 0.5 - 5, 0);
      fill(255, 0, 0);
      noStroke();
      circle(0 + tileWidth * 0.5 - 5, 0, 10);
      pop();
    }
  }
}
