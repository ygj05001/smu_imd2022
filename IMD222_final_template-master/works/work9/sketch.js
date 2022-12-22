// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];

var ground;
let rSlider, gSlider, bSlider;

function setup() {
  let boundingRects = document
    .getElementById('p5Canvas')
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent('p5Canvas');

  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);
  var options = {
    isStatic: true,
  };
  ground = Bodies.rectangle(304, height, width, 100, options);

  World.add(world, ground);

   // 슬라이더 생성하기
   rSlider = createSlider(60, 255, 0);
   rSlider.position(1100, 560);
   gSlider = createSlider(40, 255, 0);
   gSlider.position(1100, 590);
   bSlider = createSlider(200, 255, 0);
   bSlider.position(1100, 620);
}

// function keyPressed() {
//   if (key == ' ') {
//   }
// }

function mousePressed() {
  boxes.push(new Box(mouseX, mouseY, random(40, 90), random(10, 40)));
}

function draw() {
  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();
  background(r, g, b);   
  Engine.update(engine);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
  noStroke(255);
  fill(55, 10, 45, 80 );
  rectMode(CENTER);
  rect(ground.position.x, ground.position.y, width, 100);
}
z;
