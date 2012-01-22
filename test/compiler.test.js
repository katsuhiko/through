var Compiler = require('../lib/compiler');

describe('Compiler', function() {
  describe('#compile()', function() {
    // ラップ内容を確認する意味もこめて
    var params = [
      ['変数宣言をラップできること', 'var'
       , 'var a = 10;', 'a();%s', 'a();\n\nvar a = 10;']
      ,['ステートメントをラップできること', 'stat'
        , 'a = 10;', 'a();%s', 'a();\n\na = 10;']
      ,['演算子処理をラップできること', 'binary'
        , 'x + y;', 'a(%s);', 'a(x + y);']
      ,['例外をラップできること', 'throw'
        , 'throw err;', 'a();%s', 'a();\n\nthrow err;']
      ,['関数呼び出しをラップで切ること', 'call'
        , 'z(x);', 'a(%s);', 'a(z(x));']
      ,['変数返却をラップできること', 'name'
        , 'function z() { return x;}', 'a(%s);'
        , 'function z() {\n    return a(x);\n}']
      ,['前方インクリメントをラップできること', 'unary-prefix'
        , '++x', 'a(%s);', 'a(++x);']
      ,['後方インクリメントをラップできること', 'unary-postfix'
        , 'x++', 'a(%s);', 'a(x++);']
    ];

    it('ソースを変更なしでコンパイルできること', function() {
      var src = new Compiler().compile('var a = 10;');
      src.should.equal('var a = 10;');
    });

    it('ラップできること:' + params.length, function() {
      var test = function(desc, event, src, wrap, expect) {
        var c = new Compiler(),
            called = false;
        c.on(event, function(node){
          called = true;
          node.wrap(wrap);
        });

        c.compile(src).should.equal(expect, desc);
        called.should.equal(true, desc);
      };

      for (var i = 0; i < params.length; i++) {
        var param = params[i],
            desc = i + ':' + param[0];
        test(desc, param[1], param[2], param[3], param[4]);
      }
    });
  });
});
