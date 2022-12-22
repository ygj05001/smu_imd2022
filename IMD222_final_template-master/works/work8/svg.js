let Engine = Matter.Engine,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Composite = Matter.Composite,
  Vertices = Matter.Vertices,
  Svg = Matter.Svg,
  Bodies = Matter.Bodies;

// create engine
let engine;

// add mouse control
let mouse;

let canvas;
let matterObjs = [];
let colors = ["#ececd1", "#f55a3c", "#f19648", "#f5d259", "#063e7b"];

function createWalls(thickness) {
  let walls = [
    new Rect(width * 0.5, 0, width, thickness, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
    new Rect(width * 0.5, height, width, thickness, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
    new Rect(width, height * 0.5, thickness, height, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
    new Rect(0, height * 0.5, thickness, height, {
      isStatic: true,
    }).setStrokeColor("#cccccc"),
  ];
  walls.forEach((wall) => matterObjs.push(wall));
}

let pathes = [
  "./svgFiles/iconmonstr-check-mark-8-icon.svg",
  "./svgFiles/iconmonstr-paperclip-2-icon.svg",
  "./svgFiles/iconmonstr-puzzle-icon.svg",
  "./svgFiles/iconmonstr-user-icon.svg",
  "./svgFiles/svg.svg",
];

let loadSvg = function (url) {
  return fetch(url)
    .then(function (response) {
      return response.text();
    })
    .then(function (raw) {
      return new window.DOMParser().parseFromString(raw, "image/svg+xml");
    });
};

let aaa = function (root, x, y, sampleLength, scaleX, scaleY) {
  let vertexSets = select(root, "path").map(function (path) {
    return Vertices.scale(
      Svg.pathToVertices(path, sampleLength),
      scaleX,
      scaleY
    );
  });
  matterObjs.push(
    new FromConcaveBody(
      Bodies.fromVertices(x, y, vertexSets, null, true)
    ).setFillColor(colors[Math.floor(random(colors.length))])
  );
};

function setup() {
  let dom = document.getElementById("p5Canvas");
  canvas = createCanvas(
    dom.getBoundingClientRect().width,
    dom.getBoundingClientRect().height
  );
  canvas.parent("p5Canvas");
  engine = Engine.create();
  world = engine.world;

  // add bodies
  if (typeof fetch !== "undefined") {
    let select = function (root, selector) {
      return Array.prototype.slice.call(root.querySelectorAll(selector));
    };

    loadSvg(pathes[0]).then(function (root) {
      let vertexSets = select(root, "path").map(function (path) {
        return Vertices.scale(Svg.pathToVertices(path, 30), 0.4, 0.4);
      });
      let newObj = new FromConcaveBody(
        Bodies.fromVertices(100, 100, vertexSets, null, true)
      ).setFillColor(colors[Math.floor(random(colors.length))]);
      matterObjs.push(newObj);
    });

    loadSvg(pathes[1]).then(function (root) {
      let vertexSets = select(root, "path").map(function (path) {
        return Vertices.scale(Svg.pathToVertices(path, 30), 0.4, 0.4);
      });
      let newObj = new FromConcaveBody(
        Bodies.fromVertices(200, 200, vertexSets, null, true)
      ).setFillColor(colors[Math.floor(random(colors.length))]);
      matterObjs.push(newObj);
    });

    loadSvg(pathes[2]).then(function (root) {
      let vertexSets = select(root, "path").map(function (path) {
        return Vertices.scale(Svg.pathToVertices(path, 30), 0.4, 0.4);
      });
      let newObj = new FromConcaveBody(
        Bodies.fromVertices(300, 300, vertexSets, null, true)
      ).setFillColor(colors[Math.floor(random(colors.length))]);
      matterObjs.push(newObj);
    });

    loadSvg(pathes[3]).then(function (root) {
      let vertexSets = select(root, "path").map(function (path) {
        return Vertices.scale(Svg.pathToVertices(path, 30), 0.4, 0.4);
      });
      let newObj = new FromConcaveBody(
        Bodies.fromVertices(400, 400, vertexSets, null, true)
      ).setFillColor(colors[Math.floor(random(colors.length))]);
      matterObjs.push(newObj);
    });

    loadSvg(pathes[4]).then(function (root) {
      let vertexSets = select(root, "path").map(function (path) {
        return Svg.pathToVertices(path, 30);
      });
      let newObj = new FromConcaveBody(
        Bodies.fromVertices(500, 100, vertexSets, null, true)
      ).setFillColor(colors[Math.floor(random(colors.length))]);
      matterObjs.push(newObj);
    });
  } else {
    console.log("Fetch is not available. Could not load SVG.");
  }

  createWalls(50);

  console.log(matterObjs);

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
  matterObjs.forEach((obj) => {
    obj.render();
  });
  // matterObjs.forEach((obj) => {
  //   obj.renderDirVector();
  // });
}
