let NUMSINES = 10; // 얼마나 싸인을 많은 동시에 그릴 건가요?
let sines = new Array(NUMSINES); // 현재 각도들을 모두 저장하는 배열
let rad; // 중심 싸인의 초기 반지름값
let i; // 카운터 변수

// 아래의 값들을 갖고 놀며 어떤 일이 일어나는 건지 감잡아 보세요!
let fund = 0.005; // 중심 싸인의 속도
let ratio = 1; // 더해진 각 싸인은 속도에 몇을 곱하나요?
let alpha = 50; // 궤도 추적 시스템의 투명도

let trace = false; // 추적 중인가요?
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
  rad = height / 4; // 중심 원의 반지름 계산
  background(204); // 화면 비우기

  for (let i = 0; i<sines.length; i++) {
    sines[i] = PI; // 모든 원들이 북쪽을 향해 시작하도록 설정
  }

}

function draw() {
  if (!trace) {
    const r = rSlider.value();
    const g = gSlider.value();
    const b = bSlider.value();
    background(r, g, b);   

    stroke(255); // 검정색 펜
    noFill( ); // 면채우기 없음
    
  }

  // 주요 행위
  push(); // 변형 매트릭스 시작하기
  translate(width / 2, height / 2); // 화면 중앙으로 이동하기

  for (let i = 0; i < sines.length; i++) {
    let erad = 0; // 원형 내 작은 "점"의 반지름. 추적 화면에선 이것이 펜으로 쓰입니다.
    // 추적을 위한 설정
    if (trace) {
      stroke(0, 0, 255 * (float(i) / sines.length), alpha); // 파랑
      fill(0, 0, 255, alpha / 2); // 음... 또, 파랑!
      erad = 5.0 * (1.0 - float(i) / sines.length); // 펜의 너비가 어떤 싸인과 관계할 지
    }
    let radius = rad / (i + 1); // 원 그 자체의 반지름
    rotate(sines[i]); // 원 회전시키기
    if (!trace) ellipse(0, 0, radius * 2, radius * 2); // 우리가 시뮬레이션 중이라면, 싸인을 그리세요.
    push(); // 레벨 1 업
    translate(0, radius); // 싸인 모서리로 이동하기
    if (!trace) ellipse(0, 0, 5, 5); // 작은 원 그리기
    if (trace) ellipse(0, 0, erad, erad); // 만약 추적 중이라면 erad로 그리기
    pop(); // 레벨 1 다운
    translate(0, radius); // 다음 싸인을 위한 위치로 이동하기
    sines[i] = (sines[i] + (fund + (fund * i * ratio))) % TWO_PI; // fund에 따라 각도 업데이트하기
  }

  pop(); // 마지막 변형에 다다르면 레벨 1 다운

}

function keyReleased() {
  if (key==' ') {
    trace = !trace;
    background(255);
  }
}