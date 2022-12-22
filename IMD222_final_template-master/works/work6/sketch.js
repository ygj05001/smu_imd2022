let beginX = 20.0; // 초기 x 좌표
let beginY = 10.0; // 초기 y 좌표
let endX = 570.0; // 최종 x 좌표
let endY = 320.0; // 최종 y 좌표
let distX; // 이동할 X축 거리
let distY; // 이동할 Y축 거리
let exponent = 4; // 곡선 결정
let x = 0.0; // 현재 x 좌표
let y = 0.0; // 현재 y 좌표
let step = 0.01; // 경로를 따른 각 단계별 움직임 크기
let pct = 0.0; // 이동 거리 비율 (0.0과 1.0 사이)
let rSlider, gSlider, bSlider;

function setup() {
  let boundingRects = document
  .getElementById("p5Canvas")
  .getBoundingClientRect();
let canvas = createCanvas(boundingRects.width, boundingRects.height);
canvas.parent("p5Canvas");

  // 슬라이더 생성하기
  rSlider = createSlider(0, 255, 0);
  rSlider.position(1100, 560);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(1100, 590);
  bSlider = createSlider(0, 255, 0);
  bSlider.position(1100, 620);

  noStroke();
  distX = endX - beginX;
  distY = endY - beginY;

  
}

function draw() {  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();
  background(r, g, b); 
  fill(0, 20);
  rect(0, 0, width, height);
  pct += step;
  if (pct < 1.0) {
    x = beginX + pct * distX;
    y = beginY + pow(pct, exponent) * distY;
  }
  fill(255);
  ellipse(x, y, 60, 60);
}

function mousePressed() {
  pct = 0.0;
  beginX = x;
  beginY = y;
  endX = mouseX;
  endY = mouseY;
  distX = endX - beginX;
  distY = endY - beginY;
}
