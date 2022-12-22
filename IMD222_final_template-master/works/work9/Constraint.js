class P5Constraint {
  constructor(options) {
    this.constraint = Matter.Constraint.create(options);
    Matter.Composite.add(engine.world, this.constraint);
    this.color = "#cccccc";
  }
  getConstraint() {
    return this.constraint;
  }
  setColor(color) {
    this.color = color;
    return this;
  }
  render() {
    let pointAWorld = Matter.Constraint.pointAWorld(this.constraint);
    let pointBWorld = Matter.Constraint.pointBWorld(this.constraint);
    if (this.color !== null) {
      strokeWeight(1);
      stroke(this.color);
    } else noStroke();
    line(pointAWorld.x, pointAWorld.y, pointBWorld.x, pointBWorld.y);
    noStroke();
    if (this.color !== null) {
      fill(this.color);
    } else noFill();
    circle(pointAWorld.x, pointAWorld.y, 10, 10);
    circle(pointBWorld.x, pointBWorld.y, 10, 10);
  }
}
