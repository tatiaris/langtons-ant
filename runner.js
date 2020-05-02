var cols, rows;
var scl = 30;
var grid = [];
var start;
var ants;

function setup() {
  start = false;
  grid = [];
  ants = [];
  var cnv = createCanvas(innerWidth/2, innerHeight/2);
  cnv.parent('sketch-holder');
  cols = floor(innerWidth/scl);
  rows = floor(innerHeight/scl);
  createGrid();
  frameRate(10);
}
function draw() {
  background(0);
  drawGrid();
  if(start) update();
  drawLabel();
  if(keyIsDown(RIGHT_ARROW))  update();
}
function update(){
  for(var i = 0; i < ants.length; i++){
    if (grid[ants[i].x][ants[i].y].alive){
      grid[ants[i].x][ants[i].y].alive = false;
      if (ants[i].dir < 3)  ants[i].dir++;
      else   ants[i].dir = 0;
    }else {
      grid[ants[i].x][ants[i].y].alive = true;
      if (ants[i].dir > 0)  ants[i].dir--;
      else  ants[i].dir = 3;
    }
    if (ants[i].dir == 0)
      ants[i].y--;
    else if (ants[i].dir == 1)
      ants[i].x++;
    else if (ants[i].dir == 2)
      ants[i].y++;
    else if (ants[i].dir == 3)
      ants[i].x--;
    if(ants[i].x > 54 || ants[i].x < 1 || ants[i].y < 1 || ants[i].y > 31)  ants.splice(i, 1);
  }
}
function keyPressed(){
  if(keyCode == 32) start = !start;
  if(keyCode == 82) setup();
}
function createGrid(){
  for (var i = 0; i < cols; i++){
    grid[i] = [];
    for (var j = 0; j < rows; j++){
      grid[i][j] = {
        col: i,
        row: j,
        alive: false
      }
    }
  }
  for (var i = 0; i < cols; i++)
    for (var j = 0; j < rows; j++)
      grid[i][j].alive = false;
}
function drawGrid() {
  fill(0);
  stroke(255);
  for (var i = 0; i < cols; i++){
    for (var j = 0; j < rows; j++){
      if(grid[i][j].alive)  fill(255);
      rect(i*scl, j*scl, scl, scl);
      fill(0);
    }
  }
  fill(255, 0, 0);
  noStroke();
  for (var i = 0; i < ants.length; i++)
    ellipse(ants[i].x*scl + 15, ants[i].y*scl + 15, 15);
}
function mousePressed() {
  if(isAnt(mouseX, mouseY)) console.log("ant killed");
  else{
    for (var i = 1; i < cols - 1; i++){
      for (var j = 1; j < rows - 1; j++){
        if (collidePointRect(mouseX, mouseY, i*scl, j*scl, scl, scl)){
          var nAnt = new ant(i, j);
          ants.push(nAnt);
        }
      }
    }
  }
}
function collidePointRect(pointX, pointY, x, y, xW, yW) {
  if (pointX >= x && pointX <= x + xW && pointY >= y && pointY <= y + yW) return true;
  return false;
}
function isAnt(mX, mY) {
  for(var k = 0; k < ants.length; k++){
    if (collidePointRect(mX, mY, ants[k].x*scl, ants[k].y*scl, scl, scl)){
      ants.splice(k, 1);
      return true;
    }
  }
  return false;
}
function drawLabel(){
  fill(255);
  rect(0, 0, width, scl);
  textSize(20);
  stroke(0);
  fill(0);
  text("Click to place  ||  'space' or 'right arrow' to start/stop  ||  'r' to eradicate", 5, scl - 5);
}
function ant(x, y) {
  this.x = x;
  this.y = y;
  this.dir = floor(random(0, 4));
}
