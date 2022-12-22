let theta;
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
}
function draw() {
  
  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();
  background(r, g, b);    
  frameRate(30);
  stroke(255);
  // 마우스 위치에 따라 0부터 90도 중 각도 한 개를 골라볼까요!
  let a = (mouseX / width) * 50;
  // 이를 라디안 값으로 전환합니다.
  theta = radians(a);
  // 화면 하단에서 나무 시작하기
  translate(width/2,height);
  // 120픽셀 길이의 선 그리기
  line(0,0,0,-170);
  // 위의 선의 끝 지점으로 이동하기
  translate(0,-170);
  // 나뭇가지의 재귀적 분기 시작하기!
  branch(150);
  
 
}

function branch(h) {
  // 각각의 나뭇가지 크기는 이전 가지의 2/3에 해당합니다.
  h *= 0.69;

  // 모든 재귀 함수에는 종료(exit) 조건이 있어야합니다!!!
  // 이 예제의 경우, 나뭇 가지의 길이가 2픽셀과 같거나 적을 때 입니다.
  if (h > 2) {
    push();    // 현재의 변형 상태를 저장 (즉, 현재 상태)
    rotate(theta);   // theta(세타)값으로 회전하기
    line(0, 0, 0, -h);  // 나뭇가지 그리기
    translate(0, -h); // 나뭇가지의 끝 지점으로 이동하기
    branch(h);       // 자, 이제 자기 자신을 호출하여 2개의 새로운 나뭇가지를 그릴게요!
    pop();     // 이 지점에 도달할 때 마다, 이전 매트릭스 상태를 복원하기 위해 "pop(팝)"합니다.

    // 같은 내용을 반복하되, 이번에는 "왼쪽"으로만 가지가 분기하도록 만듭니다!
    push();
    rotate(-theta);
    line(0, 0, 0, -h);
    translate(0, -h);
    branch(h);
    pop();
  }
}



