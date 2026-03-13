//wen weng
//this is a inspiration from the surreal movie The Cell. there is a iconic scene where a horse was segmented. ref: https://youtu.be/gWVTP7jBv-8?si=DMwjAMlab3aXDjqs&t=68

/* to interact
1. drag the mouse to orbit
2. press "Space Bar" to action
3. press "Z" to change projection mode
4. press "X" to reverse environment
5. press "R" to reset
*/

let isOrtho = false; 
let isExpanded = false;
let spacing = 40;   // Set to 40 so the horse starts as a solid unit
let rotY = 1.5708;  // Side view (HALF_PI)
let bgCol = 0;
let strokeCol = 255;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(bgCol);

  // 1. PROJECTION MODE
  // High far-clipping (4000) to ensure the large yellow room is visible
  if (isOrtho) {
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 4000);
  } else {
    perspective(PI / 3, width / height, 0.1, 4000);
  }

  // 2. CAMERA LOGIC
  if (mouseIsPressed) {
    rotY += (mouseX - pmouseX) * 0.01;
  } else {
    rotY += 0.005; // Continuous cinematic rotation
  }
  rotateY(rotY);

  // 3. LIGHTING
  ambientLight(150);
  directionalLight(255, 255, 255, 0, 0, -1);

  // 4. EXPANSION LOGIC
  let targetSpace = isExpanded ? 90 : 40; 
  spacing = lerp(spacing, targetSpace, 0.1);

  // 5. DRAW COMPONENTS
  drawRoom(); // Draw the yellow cage first

  for (let i = 0; i < 12; i++) {
    push();
    let zPos = (i - 5.5) * spacing;
    translate(0, 0, zPos);
    drawHorseSlice(i);
    pop();
  }
}

// Function for the segmented horse and glass tanks
function drawHorseSlice(index) {
  // Glass Tank
  noFill();
  stroke(strokeCol, 100); 
  box(200, 300, 40); 

  // Horse Meat
  noStroke();
  fill(160, 40, 40); 
  
  push();
  rotateX(HALF_PI); 
  
  if (index > 0 && index < 9) {
    cylinder(50, 40); // Body
  } else if (index === 9) {
    cylinder(35, 40); // Neck
  } else {
    sphere(25);       // Head/Tail
  }
  pop();
}

// Function for the large yellow room/cage
function drawRoom() {
  push();
  let roomColor = color(255, 255, 0); // Vibrant Yellow
  
  // 1. Yellow Wireframe Cube
  noFill();
  stroke(roomColor); 
  strokeWeight(2);
  box(950, 750, 1650); 

  // 2. Yellow Floor Detail
  push();
  translate(0, 375, 0);
  rotateX(HALF_PI);
  
  // Semi-transparent yellow floor plane
  fill(255, 255, 0, 20); 
  noStroke();
  plane(950, 1650);
  
  // Yellow Floor Grid
  stroke(roomColor, 80);
  strokeWeight(1);
  for(let x = -475; x <= 475; x += 50){
    line(x, -825, x, 825);
  }
  for(let z = -825; z <= 825; z += 50){
    line(-475, z, 475, z);
  }
  pop();
  
  pop();
}

function keyPressed() {
  if (key === ' ') isExpanded = !isExpanded;
  if (key === 'z' || key === 'Z') isOrtho = !isOrtho;

  if (key === 'x' || key === 'X') {
    bgCol = bgCol === 0 ? 255 : 0;
    strokeCol = strokeCol === 255 ? 0 : 255;
  }

  if (key === 'r' || key === 'R') {
    rotY = 1.5708;
    isExpanded = false;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}