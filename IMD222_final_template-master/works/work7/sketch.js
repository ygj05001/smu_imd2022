
let snowflakes = []; // 눈송이 객체를 담는 배열
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
  let t = frameCount / 60; // 시간 업데이트

  // 매 프라임마다 무작위 개수의 눈송이 생성
  for (let i = 0; i < random(10); i++) {
    snowflakes.push(new snowflake()); // 눈송이 객체 추가
  }

  // for 반복문을 사용하여 눈송이 반복
  for (let flake of snowflakes) {
    flake.update(t); // 눈송이 위치 업데이트
    flake.display(); // 눈송이 그리기
  }
}

// snowflake 클래스
function snowflake() {
  // 좌표값 초기화
  this.posX = 0;
  this.posY = random(-50, 0);
  this.initialangle = random(0, 2 * PI);
  this.size = random(2, 20);

  // 방사형 눈송이의 반지름
  // 눈송이를 화면에 고루 퍼뜨리기 위해 선택
  this.radius = sqrt(random(pow(width / 2, 2)));

  this.update = function(time) {
    // 원형을 따라다니는 x 위치
    let w = 1; // 각속도
    let angle = w * time + this.initialangle;
    this.posX = width / 2 + this.radius * sin(angle);

    // 크기가 다른 눈송이가 미묘하게 다른 y 속도로 떨어집니다.
    this.posY += pow(this.size, 0.5);

    // 화면 하단을 지나친 눈송이는 삭제
    if (this.posY > height) {
      let index = snowflakes.indexOf(this);
      snowflakes.splice(index, 1);
    }
  };

  this.display = function() {
    ellipse(this.posX, this.posY, this.size);
  };
}
