
// 반사 횟수에 따른 대칭을 설정합니다. 반사 횟수를 조정해보세요.
let symmetry = 8;   

let angle = 360 / symmetry;
let mouseButton, keyboardButton;
let slider;
let rSlider, gSlider, bSlider;

function setup() { 
  let boundingRects = document
  .getElementById("p5Canvas")
  .getBoundingClientRect();
let canvas = createCanvas(boundingRects.width, boundingRects.height);
canvas.parent("p5Canvas");

  angleMode(DEGREES);

  // 브러시 두께 조정을 위한 슬라이더 설정하기
  brushSizeSlider = createButton('Brush Size Slider');
  sizeSlider = createSlider(100, 20, 10, 20);

     // 슬라이더 생성하기
     rSlider = createSlider(50, 255, 0);
     rSlider.position(1100, 560);
     gSlider = createSlider(20, 255, 0);
     gSlider.position(1100, 590);
     bSlider = createSlider(200, 255, 0);
     bSlider.position(1100, 620);
}


function draw() {
  const r = rSlider.value();
  const g = gSlider.value();
  const b = bSlider.value();
  background(r, g, b);    

  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 10;
    let my = mouseY - height / 10;
    let pmx = pmouseX - width / 3;
    let pmy = pmouseY - height / 3;
    
    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        let sw = sizeSlider.value();
        strokeWeight(sw);
        line(mx, my, pmx, pmy);
        push();
        scale(3, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }
  }
}
