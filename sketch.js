let points = [];
let knn;
let r = 40,
  k = 3,
  randomPts = false;
let x, y, cls, myCanvas, prediction, helper, current;
let colors = {
  'A': [255, 0, 0],
  'S': [0, 255, 0],
  'D': [0, 0, 255]
};


function setup() {
  myCanvas = createCanvas(window.innerWidth, window.innerHeight);
  stroke(255);
  cls = 'A';
  helper = createDiv("Click to Add: <br>(k=3)");
  helper.class("helper");
  current = createDiv("A");
  current.class("current");
  prediction = createDiv();
  prediction.class('prediction');

  knn = new KNN(k);
}

function draw() {
  background(0, 184, 148);

  if (cls == '') {
    prediction.removeClass('hide');
    knn.classify(k, mouseX, mouseY);
  } else {
    prediction.addClass('hide');
  }

  stroke(255);
  strokeWeight(10);
  for (let pt of knn.points) {
    stroke(pt.color);
    point(pt.x, pt.y);
  }
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
  if (x >= 0 && x < width && y >= 0 && y < height) {
    if (randomPts) {
      for (let i = 0; i < 5; i++) {
        knn.addPoint(cls, x + random(-r, r), y + random(-r, r));
      }
    } else {
      knn.addPoint(cls, x, y);
    }
  }
}

function mouseMoved() {
  prediction.position(mouseX, mouseY);
}

function keyPressed() {
  switch (keyCode) {
    case 49:
      k = 1;
      helper.html("Click to Add: <br>(k=3)");
      break;
    case 51:
      k = 3;
      helper.html("Click to Add: <br>(k=3)");
      break;
    case 53:
      k = 5;
      helper.html("Click to Add: <br>(k=5)");
      break;
    case 55:
      k = 7;
      helper.html("Click to Add: <br>(k=7)");
      break;
    case 57:
      helper.html("Click to Add: <br>(k=9)");
      k = 9;
      break;
    case 65:
      cls = 'A';
      current.html("A");
      break;
    case 82:
      randomPts = !randomPts;
      break;
    case 83:
      cls = 'S';
      current.html("S");
      break;
    case 68:
      cls = 'D';
      current.html("D");
      break;
    case ENTER:
      cls = '';
      current.html("Classify");
  }
}