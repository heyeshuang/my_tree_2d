// Generated by CoffeeScript 1.6.3
var Bud, bud, budList, elem, line, makeBranch, numOfBud, numOfLoop, params, two, _i, _len;

elem = document.getElementById('content').children[0];

params = {
  width: 1000,
  height: 1000,
  type: Two.Types.webgl
};

two = new Two(params).appendTo(elem);

numOfLoop = 5;

numOfBud = 5;

Bud = function(X, Y, X0, Y0, i) {
  this.X = X;
  this.Y = Y;
  this.X0 = X0;
  return this.Y0 = Y0;
};

budList = [];

makeBranch = function(x1, y1, x2, y2, i) {
  var j, _i, _results;
  budList.push(new Bud(x2, y2, x1, y1, i));
  if (i > numOfLoop) {

  } else {
    _results = [];
    for (j = _i = 1; 1 <= numOfBud ? _i <= numOfBud : _i >= numOfBud; j = 1 <= numOfBud ? ++_i : --_i) {
      _results.push(arguments.callee(x2, y2, x2 + 100 * Math.random(), y2 + 100 * Math.random(), i + 1));
    }
    return _results;
  }
};

makeBranch(10, 10, 100, 100, 1);

for (_i = 0, _len = budList.length; _i < _len; _i++) {
  bud = budList[_i];
  line = two.makeLine(bud.X, bud.Y, bud.X0, bud.Y0);
}

two.update();
