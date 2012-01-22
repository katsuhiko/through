var add = function(x, y) {
  return x + y;
};

function dec(x) {
  return x - 1;
}

function t(x) {
  return x;
}

function f(x) {
  return t(x);
}

var m = {
  mode: 'test',
  multi: function(x, y) {
    return x * y;
  }
};

exports.add = add;
exports.f = f;