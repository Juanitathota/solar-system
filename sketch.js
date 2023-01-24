var styles = ["black", "grey"];
var planets = ["#FFF509", "#A64521", "#D9814E", "#2DBFFF", "#D90718", "#F8E4AF", "#DEB18E", "#329DAD", "#0A4871"];
var highlight = ["#FFFFC4","#FF4521", "#F0B980", "#0CFFFF", "#FF5500", "#FFFFFF", "#FFF3A2", "#4AE7FF", "#1387D4"];
var paused = false;
var keyPause = false;
var startPause = 0;
var endPause = 0;
var curPlanet = [0, 0, 0];
var baseSize = 8;
var sun = 10 * baseSize;
var mercury = baseSize;
var venus = 1.8 * baseSize;
var earth = 2.0 * baseSize;
var mars = 1.3 * baseSize;
var jupiter = 6 * baseSize;
var saturn = 5 * baseSize;
var uranus = 3 * baseSize;
var neptune = 2.9 * baseSize;
var baseOrbit =  120;
var merOrbit = (0.9 * baseOrbit) / 2;
var venOrbit = (1.2 * baseOrbit) / 2;
var earOrbit = (1.55 * baseOrbit) / 2;
var marOrbit = (1.9 * baseOrbit) / 2;
var jupOrbit = (2.7 * baseOrbit) / 2;
var satOrbit = (3.7 * baseOrbit) / 2;
var uraOrbit = (4.6 * baseOrbit) / 2;
var nepOrbit = (5.3 * baseOrbit) / 2;
var orbitSpeed;
var orbitDuration = 30;
var ang;
var x;
var y;
var BG;
var merInfo;
var venInfo;
var earInfo;
var marInfo;
var jupInfo;
var satInfo;
var uraInfo;
var nepInfo;
var sunInfo;
function setup() {
  createCanvas(1080,720);
  BG = loadImage("Frame2.png");
  sunInfo = loadImage("sun.png");
  merInfo = loadImage("mercury.png");
  venInfo = loadImage("venus.png");
  earInfo = loadImage("earth.png");
  marInfo = loadImage("mars.png");
  jupInfo = loadImage("jupiter.png");
  satInfo = loadImage("saturn.png");
  uraInfo = loadImage("uranus.png");
  nepInfo = loadImage("neptune.png");
  sunn = loadImage("sun1.png");
  mer = loadImage("mercury1.png");
  ven = loadImage("venus1.png");
  ear = loadImage("earth1.png");
  mar = loadImage("mars1.png");
  jup = loadImage("jupiter1.png");
  sat = loadImage("saturn1.png");
  ura = loadImage("uranus1.png");
  nep = loadImage("neptune1.png");
}

function draw() {
  background(styles[0]);
  image(BG,0,0);
  push();
  translate(width/2, height/2);
  calcSpeed();
  image(sunn, -39, -39, sun, sun);
  // image(sun);
  if (touchPlanet(0, 0, sun)) {

    image(sunInfo, (width - 150)/2 - 165, 10 - height/2);
    pauseOrbit();
  }
  else {
  }
  drawPlanet(merOrbit, 88, mercury, 1, merInfo, mer);
  drawPlanet(venOrbit, 225, venus, 2, venInfo, ven);
  drawPlanet(earOrbit, 365, earth, 3, earInfo, ear);
  drawPlanet(marOrbit, 687, mars, 4, marInfo,mar);
  drawPlanet(jupOrbit, (12 * 365), jupiter, 5, jupInfo,jup);
  drawPlanet(satOrbit, (29 * 365), saturn, 6, satInfo, sat);
  drawPlanet(uraOrbit, (84 * 365), uranus, 7, uraInfo, ura);
  drawPlanet(nepOrbit, (165 * 365), neptune, 8, nepInfo, nep);
  isTouching();
  pop();
}

function keyReleased() {
  if (key == 's' || key == 'S')
    saveFrame("solarsystem.png");
  if (key == 'p' || key == 'P') {
    keyPause = true;
    pauseOrbit();
  }
  if (keyCode == ENTER || keyCode == RETURN) {
    keyPause = false;
    resumeOrbit();
  }
}


function calcSpeed() {
  if (paused) {
    orbitSpeed = orbitSpeed;
  }
  if (!paused) {
    orbitSpeed = millis() - endPause;
  }
}


function touchPlanet( x,  y,  planet) {
 if (dist(mouseX - width/2, mouseY - height/2, x, y) < planet/2) {
   curPlanet[0] = x;
   curPlanet[1] = y;
   curPlanet[2] = planet;
   return true;
 }
 return false;
}


function isTouching() {
  if (!touchPlanet(curPlanet[0], curPlanet[1], curPlanet[2]) && !keyPause) {
    resumeOrbit();
  }
}

function pauseOrbit() {
  if (!paused) {
    startPause = millis();
  }
  paused = true;
}

function resumeOrbit() {
  if (paused) {
    endPause = endPause + (millis() - startPause);
  }
  paused = false;
}

function drawPlanet( orbit,  days,  planet,  c, filename,planetImage) {
  // draw the orbital ring
  stroke(styles[1]);
  strokeWeight(1);
  noFill();
  ellipse(0, 0, orbit * 2, orbit * 2);
 
  ang = TWO_PI * orbitSpeed/(days * orbitDuration);
  x = cos(ang) * orbit;
  y = sin(ang) * orbit;
  stroke(styles[1]);
  strokeWeight(1);
 
  if (touchPlanet(x, y, planet)) {
    image(planetImage, x - planet/2, y - planet/2, planet, planet);
    image(filename, (width - 150)/2 - 165, 10 - height/2);
    pauseOrbit();
  }
  else {
    image(planetImage, x - planet/2, y - planet/2, planet, planet);
  }
}