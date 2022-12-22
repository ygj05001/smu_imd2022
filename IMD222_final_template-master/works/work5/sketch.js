
// 상단의 막대기를 위한 용수철(spring) 그리기
let springHeight = 34,
    left,
    right,
    maxHeight = 220,
    minHeight = 100,
    over = false,
    move = false;

    let rSlider, gSlider, bSlider;



// 용수철 시뮬레이션 상수들
let M = 0.80  ,  // Mass(질량)
    K = 0.4,  // 용수철(spring) 상수
    D = 0.9, // Damping(감쇠)
    R = 150;  // Rest Position(놓인 위치)

// 용수철 시뮬레이션 변수들
let ps = R,   // 위치
    vs = 0.0, // 속도
    as = 0,   // 가속도
    f = 0;    // 힘

function setup() {
  createCanvas(610,100);
  rectMode(CORNERS);
  noStroke();
  left = width / 2 - 100;
  right = width / 2 + 100;
  let boundingRects = document
  .getElementById("p5Canvas")
  .getBoundingClientRect();
let canvas = createCanvas(boundingRects.width, boundingRects.height);
canvas.parent("p5Canvas");

// 슬라이더 생성하기
    rSlider = createSlider(0, 255, 0);
    rSlider.position(1100, 560);
    gSlider = createSlider(200, 255, 0);
    gSlider.position(1100, 590);
    bSlider = createSlider(0, 255, 0);
    bSlider.position(1100, 620);
}

function draw() {
  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();
  background(r, g, b);    
  frameRate(30);

  updateSpring();
  drawSpring();
}

function drawSpring() {
  // 바탕 그리기
  fill(55, 10, 45, 80);
  let baseWidth = 0.6 * ps + -10;
  rect(width / 2 - baseWidth, ps + springHeight, width / 2 + baseWidth, height);

  // 상단 막대기의 색상 설정하고 그리기
  if (over || move) {
    fill(0);
  } else {
    fill(200);
  }

  rect(left, ps, right, ps + springHeight);
}

function updateSpring() {
  // 용수철(spring) 위치 업데이트
  if ( !move ) {
    f = -K * ( ps - R ); // f=-ky
    as = f / M;          // 가속도 설정, f=ma == a=f/m
    vs = D * (vs + as);  // 속도 설정
    ps = ps + vs;        // 업데이트된 위치
  }

  if (abs(vs) < 0.1) {
    vs = 0.0;
  }

  // 마우스가 상단 막대기 위에 있는지 여부 테스트
  if (mouseX > left && mouseX < right && mouseY > ps && mouseY < ps + springHeight) {
    over = true;
  } else {
    over = false;
  }

  // 상단 막대기의 위치 설정 및 제한
  if (move) {
    ps = mouseY - springHeight / 2;
    ps = constrain(ps, minHeight, maxHeight);
  }
}

function mousePressed() {
  if (over) {
    move = true;
  }
}

function mouseReleased() {
  move = false;
}
