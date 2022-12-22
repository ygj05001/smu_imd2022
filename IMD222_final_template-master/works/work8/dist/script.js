const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const img = document.querySelector("img");

let built = false;
let pixels = [];
const config = {
  strength: 2000,
  easeFactor: 0.1,
  glow: true,
  stats: false,
  pxSize: 15
};
const mousePosition = { x: 0, y: 0 };


function setup() {
  let boundingRects = document
    .getElementById("p5Canvas")
    .getBoundingClientRect();
  let canvas = createCanvas(boundingRects.width, boundingRects.height);
  canvas.parent("p5Canvas");
}
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  buildPixelData();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  stats.begin();
  if (!built) {
    this.buildPixelData();
  }

  for (let i = 0; i < pixels.length; i++) {
    const pixel = pixels[i];
    const deltaX = pixel.x - mousePosition.x;
    const deltaY = pixel.y - mousePosition.y;
    const angle = Math.atan2(deltaY, deltaX);
    let distance =
      config.strength / Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (config.glow) {
      pixel.r += distance;
      pixel.g += distance;
      pixel.b += distance;
      pixel.r += (pixel.or - pixel.r) * config.easeFactor;
      pixel.g += (pixel.og - pixel.g) * config.easeFactor;
      pixel.b += (pixel.ob - pixel.b) * config.easeFactor;
      context.fillStyle = `rgb(${pixel.r}, ${pixel.g}, ${pixel.b})`;
    } else {
      context.fillStyle = `rgb(${pixel.or}, ${pixel.og}, ${pixel.ob})`;
    }

    pixel.x += Math.cos(angle) * distance;
    pixel.y += Math.sin(angle) * distance;
    pixel.x += (pixel.ox - pixel.x) * config.easeFactor;
    pixel.y += (pixel.oy - pixel.y) * config.easeFactor;

    context.beginPath();
    context.arc(pixel.x, pixel.y, pixel.size / 2, 0, Math.PI * 2);
    context.fill();
  }
  stats.end();
  window.requestAnimationFrame(draw);
}

function getPixels() {
  const data = context.getImageData(0, 0, img.width, img.height);
  const pxs = [];
  for (let x = 0; x < data.width; x += config.pxSize) {
    for (let y = 0; y < data.height; y += config.pxSize) {
      let index = x * 4 + y * 4 * img.width;
      let alpha = data.data[index + 3];
      if (alpha > 0) {
        pxs.push({
          x: canvas.width / 2 - img.width / 2 + x,
          y: canvas.height / 2 - img.height / 2 + y,
          ox: canvas.width / 2 - img.width / 2 + x,
          oy: canvas.height / 2 - img.height / 2 + y,
          size: config.pxSize,
          oSize: config.pxSize,
          r: data.data[index],
          g: data.data[index + 1],
          b: data.data[index + 2],
          or: data.data[index],
          og: data.data[index + 1],
          ob: data.data[index + 2],
          rgb:
            "rgb(" +
            data.data[index] +
            "," +
            data.data[index + 1] +
            "," +
            data.data[index + 2] +
            ")"
        });
      }
    }
  }
  return pxs;
}

function buildPixelData() {
  if(img.width === 0 || img.height === 0){
     return;
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0);
  pixels = [];
  pixels = getPixels();
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (pixels.length > 0) {
    built = true;
  }
}

function buildGUI() {
  const gui = new dat.GUI({ closed: true });
  gui.closed = true;
  gui.add(config, "strength", 0, 7000);
  gui.add(config, "easeFactor", 0.05, 0.2);
  gui.add(config, "glow");
  const sizeController = gui.add(config, "pxSize", 8, 80, 1);
  const statsController = gui.add(config, "stats");
  sizeController.onFinishChange(() => {
    buildPixelData();
  });
  statsController.onChange(value => {
    if (value) {
      document.body.appendChild(stats.dom);
    } else {
      stats.dom.parentNode.removeChild(stats.dom);
    }
  });
}

function onMouseMove(event) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
}

function touchMoveHandler(event) {
  mousePosition.x = event.touches[0].clientX;
  mousePosition.y = event.touches[0].clientY;
}

const stats = new Stats();
stats.showPanel(0);

window.addEventListener("DOMContentLoaded", event => {
  buildGUI();
  resize();
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("touchmove", touchMoveHandler);
  window.addEventListener("resize", resize);
  window.requestAnimationFrame(draw);
});