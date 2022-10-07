// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Example 1-2: Bouncing Ball, with p5.Vector!

class Ball {
  constructor() {
    this.position = new createVector(width/2,height/2);
    //해결 방법은 피타고라스의 정리인데 못구함
    this.velocity = new createVector(6, 8);
    //방향을 미만인데 0은 360으로 치환 360은 359까지로
    this.velocity.rotate(random(0, 360))
    this.dimeter = 200;
    
  }

  update() {
    // 확장된 원에서 반지름값인 30만큼을 x보다 크게 주면 위 왼쪽에서 튕기고
    // 반지름값에서 -30만큼을 빼면 아래 오른쪽이 30만큼 빼고 튕겨진다.
    //여기는 벽 팅 관련
    this.position.add(this.velocity);
    if ((this.position.x > width -30) || (this.position.x < 30)) {
      this.velocity.x = this.velocity.x * -1;
    }
    if ((this.position.y > height -30) || (this.position.y < 30)) {
      this.velocity.y = this.velocity.y * -1;
    }
  }
  display() {
    // 원이 아니고 점인데 그 점에서 60만큼 확장한거임
    stroke(0);
    fill(255, 0, 255);
    ellipse(this.position.x, this.position.y, 60, 60);
    line(this.position.x,this.position.y,this.position.x+this.velocity.x,this.position.y+this.velocity.y);
  }
}
