function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
}

let howManyX = 20;
let howManyY = 20;
let seedNum = 0;
let noiseMult = 0.003;

function mousePressed() {
  seedNum = random(5);
}

function draw() {
  // randomSeed(seedNum);
  noiseMult = map(mouseX, 0, width, 0, 0.1);
  noiseSeed(seedNum);
  noStroke();
  fill(255);
  rect(0, 0, width, height);
  let tileWidth = width / (howManyX + 1);
  let tileHeight = height / (howManyY + 1);
  // colorMode(HSB);
  for (let tileCntX = 0; tileCntX < howManyX; tileCntX++) {
    for (let tileCntY = 0; tileCntY < howManyY; tileCntY++) {
      let tileCenterX = tileWidth * (tileCntX + 1);
      let tileCenterY = tileHeight * (tileCntY + 1);
      // let randAngle = random(0, radians(360));
      let noiseVal = noise(tileCntX * noiseMult, tileCntY * noiseMult);
      let noiseAngle = radians(360) * noiseVal;
      // let noiseColor = 360 * noiseVal;
      let colorR = (255 * tileCntX) / (howManyX - 1);
      let colorB = (255 * tileCntY) / (howManyY - 1);
      push();
      translate(tileCenterX, tileCenterY);
      // rotate(randAngle);
      rotate(noiseAngle);
      noFill();
      stroke(colorR, 127, colorB);
      strokeWeight(10);
      line(0 - tileWidth * 0.5 + 5, 0, 0 + tileWidth * 0.5 - 5, 0);
      // fill(255, 0, 0);
      // noStroke();
      // circle(0 + tileWidth * 0.5 - 5, 0, 10);
      pop();
    }
  }
}
