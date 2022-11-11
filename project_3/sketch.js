
let t = 0; // 시간 변수

function setup() {
  createCanvas(1800, 600);
  noStroke();
  fill(0, 0, 255);

}

function draw() {
  background(10, 10); // 불투명한 배경화면(파티클의 꼬리 만들기)

  // 타원형으로 구성된 x와 y 그리드 만들기
  for (let x = 0; x <= width; x = x + 26) {
    for (let y = 0; y <= height; y = y + 35) {
      // 각 타원의 시작 점은 마우스 위치에 따라 달라집니다.
      const xAngle = map(mouseX, 0, width, -5 * PI, 5 * PI, true);
      const yAngle = map(mouseY, 0, height, -5 * PI, 5 * PI, true);
      // 또, 파티클의 위치에 따라 달라집니다.
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // 각 파티클은 동그라미를 그리며 움직입니다.
      const myX = x + 25 * cos(4 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);

      ellipse(myX, myY, 15); // 파티클로 그리기

      fill(0, 0);
      rect(0, 0, width, height);
      fill(0, 0, 255);
      noStroke();
      ellipse(mouseX, mouseY, 120, 120);

    }
  }

  t = t + 0.004; // 시간 업데이트
}
