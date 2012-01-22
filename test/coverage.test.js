var Coverage = require('../lib/coverage'),
    should = require('should');

describe('Coverage', function() {
  describe('#register()', function() {
    var cover = new Coverage();
    cover.register('abc', 10);

    it('初期値ゼロとして行が追加されること', function() {
      cover.result.should.have.property('abc');
      cover.result['abc'].length.should.equal(11);
      cover.result['abc'][10].should.equal(0);
    });
    it('未追加の行は未定義となっていること', function() {
      should.equal(undefined, cover.result['abc'][0]);
    });
    it('2重で追加できること', function() {
      cover.register('abc', 10);
      cover.result.should.have.property('abc');
      cover.result['abc'].length.should.equal(11);
      cover.result['abc'][10].should.equal(0);
    });
  });

  describe('#registered()', function() {
    var cover = new Coverage();
    cover.register('abc', 10);

    it('登録されていることを確認できること', function() {
      cover.registered('abc', 10).should.be.true;
    });
    it('未登録であることを確認できること', function() {
      cover.registered('abc', 0).should.be.false;
    });
  });

  describe('#pass()', function() {
    var cover = new Coverage();
    cover.register('abc', 10);

    it('一回通ったらカウトアップされること', function() {
      cover.result['abc'][10].should.equal(0);
      cover.pass('abc', 10);
      cover.result['abc'][10].should.equal(1);
    });
    it('通った回数分カウントアップされること', function() {
      cover.result['abc'][10].should.equal(1);
      cover.pass('abc', 10);
      cover.pass('abc', 10);
      cover.result['abc'][10].should.equal(3);
    });
    it('未登録行でもカウントされること', function() {
      should.equal(undefined, cover.result['abc'][0]);
      cover.pass('abc', 0);
      cover.result['abc'][0].should.equal(1);
    });
  });
});