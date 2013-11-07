// Generated by CoffeeScript 1.6.3
var Bud, Leaf, anRange, bRange, budList, c, canvasClean, cxt, drawBranch, drawLeaf, drawMisc, getToday, h0, lColor, leafList, length0, makeBranch, numOfBud, numOfLoop, rLeaf, random, reduceH, reduceL, rootX, rootY, w0, weight0;

c = document.getElementById("myCanvas");

cxt = c.getContext("2d");

w0 = cxt.canvas.width = window.innerWidth;

h0 = cxt.canvas.height = window.innerHeight;

random = function(m, n) {
  return Math.random() * (n - m) + m;
};

getToday = function() {
  var dateDiff, diffDays, firstDay, msPerDay, now;
  now = new Date();
  firstDay = new Date(now.getFullYear(), 0, 1);
  dateDiff = now - firstDay;
  msPerDay = 1000 * 60 * 60 * 24;
  diffDays = Math.ceil(dateDiff / msPerDay);
  return diffDays;
};

rootX = 0.3 * w0;

rootY = 1.25 * h0;

length0 = 0.5 * h0;

weight0 = w0 / 75;

anRange = Math.PI / 3;

bRange = Math.PI / 3;

reduceL = 0.6;

reduceH = 0.8;

rLeaf = w0 / 150;

numOfLoop = 5;

numOfBud = 7;

lColor = {
  H: 155,
  S: 75,
  LA: random(20, 70),
  LR: 10
};

lColor.H = getToday() * 360 / 365;

Bud = function(X, Y, X0, Y0, w, i) {
  this.X = X;
  this.Y = Y;
  this.X0 = X0;
  this.Y0 = Y0;
  this.w = w;
  return this.i = i;
};

Leaf = function(X, Y, r, i) {
  this.X = X;
  this.Y = Y;
  this.r = r;
  return this.i = i;
};

budList = [];

leafList = [];

makeBranch = function(x1, y1, i, l, w, a0, b0) {
  var j, m, n, r, tmp, x2, x3, y2, y3, _i, _j, _ref, _results;
  x2 = x1 - l * Math.sin(a0) * Math.sin(b0);
  y2 = y1 - l * Math.cos(a0) * Math.sin(b0);
  budList.push(new Bud(x2, y2, x1, y1, w, i));
  if (i > 0) {
    for (tmp = _i = 0, _ref = Math.ceil((numOfLoop - i + 1) ^ 2); 0 <= _ref ? _i <= _ref : _i >= _ref; tmp = 0 <= _ref ? ++_i : --_i) {
      m = random(-5, 5 + l * Math.sin(b0));
      n = random(0, w0 / 30 - 3 * i);
      y3 = y1 - (m * Math.cos(a0) + n * Math.sin(a0));
      x3 = x1 - (m * Math.sin(a0) + n * Math.cos(a0));
      r = rLeaf;
      leafList.push(new Leaf(x3, y3, r, i));
    }
  }
  if (i < numOfLoop) {
    _results = [];
    for (j = _j = 1; 1 <= numOfBud ? _j <= numOfBud : _j >= numOfBud; j = 1 <= numOfBud ? ++_j : --_j) {
      _results.push(arguments.callee(x2, y2, i + 1, l * random(reduceL, reduceH), w * random(reduceL - 0.2, reduceH - 0.2), random(-anRange, anRange) + a0, random(-anRange, anRange) + b0));
    }
    return _results;
  }
};

makeBranch(rootX, rootY, 0, length0, weight0, 0, Math.PI / 2);

canvasClean = function() {
  cxt.clearRect(0, 0, w0, h0);
  w0 = cxt.canvas.width = window.innerWidth;
  h0 = cxt.canvas.height = window.innerHeight;
};

drawBranch = function(budList) {
  var bud, lastW, _i, _len;
  lastW = budList[0].w;
  cxt.lineWidth = lastW;
  cxt.lineCap = "round";
  cxt.beginPath();
  for (_i = 0, _len = budList.length; _i < _len; _i++) {
    bud = budList[_i];
    if (bud.w !== lastW) {
      cxt.closePath();
      cxt.stroke();
      lastW = bud.w;
      cxt.lineWidth = bud.w;
      cxt.strokeStyle = "rgba(0,0,0," + (1 - bud.i / numOfLoop / 1.1) + ")";
      cxt.beginPath();
    }
    cxt.moveTo(bud.X, bud.Y);
    cxt.lineTo(bud.X0, bud.Y0);
  }
  cxt.closePath();
  return cxt.stroke();
};

drawLeaf = function(leafList, lColor, fuzzy) {
  var leaf, _i, _len, _results;
  if (fuzzy == null) {
    fuzzy = false;
  }
  _results = [];
  for (_i = 0, _len = leafList.length; _i < _len; _i++) {
    leaf = leafList[_i];
    cxt.beginPath();
    cxt.arc(leaf.X, leaf.Y, leaf.r, 0, 2 * Math.PI);
    cxt.closePath();
    if (!fuzzy) {
      cxt.fillStyle = ("hsla(" + lColor.H + ",") + ("" + lColor.S + "%,") + ("" + (random(lColor.LA - lColor.LR, lColor.LA + lColor.LR)) + "%,0.1)");
    } else {
      cxt.fillStyle = ("rgba(" + (Math.round(Math.random() * 255)) + ",") + ("" + (Math.round(Math.random() * 255)) + "," + (Math.round(Math.random() * 255)) + ",0.2)");
    }
    _results.push(cxt.fill());
  }
  return _results;
};

drawMisc = function() {
  cxt.globalCompositeOperation = "destination-over";
  cxt.fillStyle = "#444444";
  cxt.fillRect(0, h0 - 18, w0, 30);
  cxt.globalCompositeOperation = "source-over";
  cxt.textBaseline = "bottom";
  cxt.font = "10px italic Serif";
  cxt.fillStyle = "#000000";
  cxt.textAlign = "right";
  return cxt.fillText("mailto:yeshuanghe#gmail", w0 - 10, h0);
};

setTimeout(function() {
  canvasClean();
  drawBranch(budList);
  drawLeaf(leafList, lColor);
  drawMisc();
}, 100);

document.getElementById("fuzzy").addEventListener("click", function() {
  var fuzzy;
  canvasClean();
  drawBranch(budList);
  drawLeaf(leafList, lColor, fuzzy = true);
  return drawMisc();
});

document.getElementById("orange").addEventListener("click", function() {
  canvasClean();
  drawBranch(budList);
  return drawMisc();
});

document.getElementById("restore").addEventListener("click", function() {
  canvasClean();
  drawBranch(budList);
  drawLeaf(leafList, lColor);
  return drawMisc();
});
