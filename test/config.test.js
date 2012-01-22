var config = require('../lib/config');

describe('config', function() {
  it('読み込めること', function() {
    var options = config('./test/config/test.json');
    options.should.have.property('key', 'value');
  });
  it('読み込めなくてもエラーが発生しないこと', function() {
    var options = config('./test/config/notfound.json');
  });
  it('初期値を指定できること', function() {
    var options = { "add": "add value" };
    options = config('./test/config/test.json', options);
    options.should.have.property('add', 'add value');
  });
  it('初期値を上書きできること', function() {
    var options = { "update": "init value" };
    options = config('./test/config/test.json', options);
    options.should.have.property('update', 'load value');
  });
});
