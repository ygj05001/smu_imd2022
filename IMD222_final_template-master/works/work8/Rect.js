class Rect {
  constructor(x, y, width, height, options) {
    this.body = Matter.Bodies.rectangle(x, y, width, height, options);
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
    if (this.strokeColor !== null) {
      strokeWeight(1);
      stroke(this.strokeColor);
    } else noStroke();
    if (this.fillColor !== null) fill(this.fillColor);
    else noFill();
    beginShape();
    this.body.vertices.forEach((v) => {
      vertex(v.x, v.y);
    });
    endShape(CLOSE);
  }
  renderDirVector() {
    strokeWeight(1);
    stroke(0);
    line(
      this.body.position.x,
      this.body.position.y,
      this.body.vertices[0].x,
      this.body.vertices[0].y
    );
  }
}
