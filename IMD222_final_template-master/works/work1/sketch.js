let tiles = [];

function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  console.log(1);
  console.log(
    document.getElementById("p5Canvas").getBoundingClientRect().width
  );
  console.log(
    document.getElementById("p5Canvas").getBoundingClientRect().height
  );
  canvas.parent("p5Canvas");
  let tileWidth = width / (howManyX + 1);
  let tileHeight = height / (howManyY + 1);
  for (let tileCntX = 0; tileCntX < howManyX; tileCntX++) {
    for (let tileCntY = 0; tileCntY < howManyY; tileCntY++) {
      let tileX = tileWidth * (tileCntX + 1) - tileWidth * 0.5;
      let tileY = tileHeight * (tileCntY + 1) - tileHeight * 0.5;
      let tile = new Tile(tileX, tileY, tileWidth, tileHeight);
      tiles.push(tile);
    }
  }
}

let howManyX = 20;
let howManyY = 20;

function mousePressed() {
  tiles.forEach((tile) => {
    tile.setStateByMouse(mouseX, mouseY);
  });
}

function draw() {
  background(255);
  tiles.forEach((tile) => {
    tile.render();
  });
}
