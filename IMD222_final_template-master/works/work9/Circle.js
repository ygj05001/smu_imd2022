class P5Circle {
  constructor(x, y, radius, options) {
    this.radius = radius;
    this.body = Matter.Bodies.circle(x, y, this.radius, options);
    Matter.Composite.add(engine.world, this.body);
    this.fillColor = null;
    this.strokeColor = null;
  }
  getBody() {
    return this.body;
  }
  setFillColor(fillColor) {
    this.fillColor = fillColor;
    return this;
  }
  setStrokeColor(strokeColor) {
    this.strokeColor = strokeColor;
    return this;
  }
  render() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    if (this.strokeColor !== null) {
      strokeWeight(1);
      stroke(this.strokeColor);
    } else noStroke();
    if (this.fillColor !== null) fill(this.fillColor);
    else noFill();
    circle(0, 0, this.radius * 2);
    pop();
  }
  renderDirVector() {
    push();
    translate(this.body.position.x, this.body.position.y);
    rotate(this.body.angle);
    strokeWeight(1);
    stroke(0);
    line(0, 0, this.radius, 0);
    pop();
  }
}
