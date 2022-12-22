let Engine = Matter.Engine,
  Render = Matter.Render,
  Composites = Matter.Composites,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite,
  Bodies = Matter.Bodies;

// create engine
let engine;

// add mouse control
let mouse;

let canvas;
let matterBodies = [];
let matterConstraints = [];
let walls = [];
let colors = ["#ececd1", "#f55a3c", "#f19648", "#f5d259", "#063e7b"];

function createWalls(thickness) {
  let walls = [
    new P5Rect(width * 0.5, 0, width, thickness, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
    new P5Rect(width * 0.5, height, width, thickness, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
    new P5Rect(width, height * 0.5, thickness, height, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
    new P5Rect(0, height * 0.5, thickness, height, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
  ];
  walls.forEach((wall) => matterBodies.push(wall));
  return walls;
}

function setup() {
  let dom = document.getElementById("p5Canvas");
  canvas = createCanvas(
    dom.getBoundingClientRect().width,
    dom.getBoundingClientRect().height
  );
  canvas.parent("p5Canvas");
  engine = Engine.create();
  world = engine.world;

  walls = createWalls(50);

  // add stiff global constraint
  let body0 = new P5Polygon(150, 200, 5, 30);
  matterBodies.push(body0);
  let constraint0 = new P5Constraint({
    pointA: { x: 150, y: 100 },
    bodyB: body0.getBody(),
    pointB: { x: -10, y: -10 },
  });
  matterConstraints.push(constraint0);

  // add soft global constraint
  let body1 = new P5Polygon(280, 100, 3, 30);
  matterBodies.push(body1);
  let constraint1 = new P5Constraint({
    pointA: { x: 280, y: 120 },
    bodyB: body1.getBody(),
    pointB: { x: -10, y: -7 },
    stiffness: 0.001,
  });
  matterConstraints.push(constraint1);

  // add damped soft global constraint
  let body2 = new P5Polygon(400, 100, 4, 30);
  matterBodies.push(body2);
  let constraint2 = new P5Constraint({
    pointA: { x: 400, y: 120 },
    bodyB: body2.getBody(),
    pointB: { x: -10, y: -10 },
    stiffness: 0.001,
    damping: 0.05,
  });
  matterConstraints.push(constraint2);

  // add revolute constraint
  let body3 = new P5Rect(600, 200, 200, 20);
  let ball3 = new P5Circle(550, 150, 20);
  matterBodies.push(body3);
  matterBodies.push(ball3);
  let constraint3 = new P5Constraint({
    pointA: { x: 600, y: 200 },
    bodyB: body3.getBody(),
    length: 0,
  });
  matterConstraints.push(constraint3);

  // add revolute multi-body constraint
  let body4 = new P5Rect(500, 400, 100, 20, {
    collisionFilter: { group: -1 },
  });
  let ball4 = new P5Circle(600, 400, 20, { collisionFilter: { group: -1 } });
  matterBodies.push(body4);
  matterBodies.push(ball4);
  let constraint4 = new P5Constraint({
    bodyA: body4.getBody(),
    bodyB: ball4.getBody(),
  });
  matterConstraints.push(constraint4);

  // add stiff multi-body constraint
  let body5A = new P5Polygon(100, 400, 6, 20);
  let body5B = new P5Polygon(200, 400, 1, 50);
  matterBodies.push(body5A);
  matterBodies.push(body5B);
  let constraint5 = new P5Constraint({
    bodyA: body5A.getBody(),
    pointA: { x: -10, y: -10 },
    bodyB: body5B.getBody(),
    pointB: { x: -10, y: -10 },
  });
  matterConstraints.push(constraint5);

  // add soft global constraint
  let body6A = new P5Polygon(300, 400, 4, 20);
  let body6B = new P5Polygon(400, 400, 3, 30);
  matterBodies.push(body6A);
  matterBodies.push(body6B);
  let constraint6 = new P5Constraint({
    bodyA: body6A.getBody(),
    pointA: { x: -10, y: -10 },
    bodyB: body6B.getBody(),
    pointB: { x: -10, y: -7 },
    stiffness: 0.001,
  });
  matterConstraints.push(constraint6);

  // add damped soft global constraint
  let body7A = new P5Polygon(500, 400, 6, 30);
  let body7B = new P5Polygon(600, 400, 7, 60);
  matterBodies.push(body7A);
  matterBodies.push(body7B);
  let constraint7 = new P5Constraint({
    bodyA: body7A.getBody(),
    pointA: { x: -10, y: -10 },
    bodyB: body7B.getBody(),
    pointB: { x: -10, y: -10 },
    stiffness: 0.001,
    damping: 0.1,
  });
  matterConstraints.push(constraint7);

  matterBodies
    .filter((body) => !walls.includes(body))
    .forEach((body) => {
      body.setFillColor(colors[Math.floor(random(colors.length))]);
    });

  // console.log(matterBodies);
  console.log(constraint7);

  // console.log(constraint7.getConstraint().bodyA.position.x);

  mouse = Mouse.create(canvas.elt);
  mouse.pixelRatio = pixelDensity();
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  Composite.add(world, mouseConstraint);
}

function draw() {
  background(255);
  Engine.update(engine);
  matterBodies.forEach((body) => {
    body.render();
  });
  matterConstraints.forEach((constraint) => constraint.render());
  // matterBodies.forEach((body) => {
  //   body.renderDirVector();
  // });
}
