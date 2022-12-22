function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
}

let howManyX = 20;
let howManyY = 20;

function draw() {
  background(255);
  noFill();
  stroke(0);
  strokeWeight(10);
  let tileWidth = width / (howManyX + 1);
  let tileHeight = height / (howManyY + 1);
  for (let tileCntX = 0; tileCntX < howManyX; tileCntX++) {
    for (let tileCntY = 0; tileCntY < howManyY; tileCntY++) {
      let tileCenterX = tileWidth * (tileCntX + 1);
      let tileCenterY = tileHeight * (tileCntY + 1);
      // 점A~타일 중심에서
      // 점B~마우스로 향하는
      // 각도 구하는 용도로 씀
      // A: (x, y), B: (i, j)
      // atan2(j - y, i - x)
      let toMouseAngle = atan2(mouseY - tileCenterY, mouseX - tileCenterX);
      push();
      translate(tileCenterX, tileCenterY);
      rotate(toMouseAngle);
      line(0 - tileWidth * 0.5 + 5, 0, 0 + tileWidth * 0.5 - 5, 0);
      pop();
    }
  }
}
