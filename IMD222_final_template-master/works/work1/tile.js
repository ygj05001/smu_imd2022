class Tile {
  constructor(a, b, c, d) {
    this.x = a;
    this.y = b;
    this.w = c;
    this.h = d;
    this.state = false;
  }

  isHover(mx, my) {
    if (mx >= this.x && mx < this.x + this.w) {
      if (my >= this.y && my < this.y + this.h) {
        return true;
      }
    }
    return false;
  }

  toggleState() {
    this.state = !this.state;
  }

  setStateByMouse(mx, my) {
    if (this.isHover(mx, my)) {
      this.toggleState();
    }
  }

  render() {
    noStroke();
    if (this.state) {
      fill(255, 0, 0);
    } else {
      fill(255, 127, 0);
    }
    push();
    translate(this.x, this.y);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
