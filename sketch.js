let nodes = [];
let flowField;
let scale = 20;
let cols, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scale);
  rows = floor(height / scale);
  flowField = new Array(cols * rows);
  generateNodes();
}

function draw() {
  setDynamicGradient();
  generateFlowField();
  drawLinesBetweenNodes();
  updateAndDisplayNodes();
}

function generateNodes() {
  nodes = [];
  for (let i = 0; i < 50; i++) {
    nodes.push(createVector(random(width), random(height)));
  }
}

function mousePressed() {
  generateNodes();
}



function draw() {
  setDynamicGradient();
  generateFlowField();

  // Draw lines between nodes
  stroke(255, 200, 0, 100);
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
    }
  }

  updateAndDisplayNodes();
}

function generateFlowField() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      xoff += 0.1;
    }
    yoff += 0.1;
  }
}

function updateAndDisplayNodes() {
  for (let i = 0; i < nodes.length; i++) {
    let x = floor(nodes[i].x / scale);
    let y = floor(nodes[i].y / scale);
    let index = x + y * cols;
    let force = flowField[index];

    nodes[i].add(force);

    fill(0, 255, 255);
    noStroke();
    ellipse(nodes[i].x, nodes[i].y, 10, 10);
  }
}

function setDynamicGradient() {
  let c1 = color(255, 0, 0, 150); // Changed to a vibrant red
  let c2 = color(0, 255, 0, 150); // Changed to a vibrant green
  for (let y = 0; y < height; y++) {
    let n = map(y, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
    line(0, y, width, y);
  }
}
