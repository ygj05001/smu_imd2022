function setup() {
 let boundingRects = document
 .getElementById("p5canvas")
 .getBoundingClientRect();
  let canvas = createcanvas (boundingRects.width, boundingRects.height);
  canvas.parent("p5canvas");  
}

let howmantX = 50;
let howmantY = 50;
function draw() {
  background(255);
  stroke(0);
  nofill();
 for(let tilecntX= 0; tilecntX <howmantX; tilecntX++) {
  for(let tilecntY= 0; tilecntY <howmantY; tilecntY++) {
    let tileX = width / (howmantX + 1) * (tilecntX + 1);
    let tileY = width / (howmantY + 1) * (tilecntX + 1);
    circle (tileX, tileY ,10);
  }

 }
}