require('../lib/through');
var calc = require('./lib/calc');

describe('through', function() {
  var list = function() {
    for (var name in through.result) {
      if (/.*calc\.js$/.test(name)) {
        return through.result[name];
      }
    }
    return [];
  };
  it('読み込めること', function() {
    list().should.eql(
      [ 1, 0, , , , 0, , , , 0, , , , 0, , , 1, , , 0, , , , 1, 1 ]);
  });
  it('呼び出した関数の処理がカウントされること', function() {
    calc.add(2, 3);
    list().should.eql(
      [ 1, 1, , , , 0, , , , 0, , , , 0, , , 1, , , 0, , , , 1, 1 ]);
  });
  it('内部で呼び出した関数の処理もカウントされること', function() {
    calc.f(10);
    list().should.eql(
      [ 1, 1, , , , 0, , , , 1, , , , 1, , , 1, , , 0, , , , 1, 1 ]);
  });
});
