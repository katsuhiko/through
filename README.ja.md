Through
======================
Node.js を利用したアプリケーションの Coverage ツールです。

`require` でモジュールを読み込むときに Coverage 用のコードを埋め込みます。

利点は、Coverage 用のコードを埋め込んだソースを用意する必要がない点です。

欠点は、モジュール読み込みの処理が遅くなる点です。

インストール
------

...

使い方
------
Coverage 対象となるモジュールを読み込む前に Through モジュールを読み込みます。

    require('through');

その後、測定したいモジュールを `require` し、実行します。

Coverage 計測データ
------
グローバル変数 `through` に格納されます。

### result ###
Coverage 計測データが格納されます。

ファイル名がキーとなり、その値がそのファイルの計測データです。

    var result = through.result;
    for (var path in result) { // /myapp/lib/foo.js
      if (result.hasOwnProperty(path)) {
        result[path]; // [ 1, 2, , , , 0, , , 1, , , 0, , , , 1, 1 ]
      }
    }

オプション
------
./test/through.json にオプションを指定できます。

    {
        "globalName": "through", 
        "target": ".*calc.js$"
    }

### globalName ###
Coverage 計測関数や計測データを格納するためのグローバル変数名です。デフォルトは、`through` です。

### target ###
(このオプション名は変える予定です)
Coverage 計測対象とするモジュールを正規表現で指定します。
計測対象のモジュールが増えると処理が遅くなります。
このオプションで計測対象のモジュールを制限することは、とても大切です。

例えば
------
もし、あなたが emacs を利用しているのであれば、
[mocha](https://mochajs.org/) と
[coverlay.el](https://github.com/twada/coverlay.el) 
を利用することで、強力なツールになります。

mocha に独自の reporter を追加します。
(これは、正式な mocha の使い方ではありません。この reporter がいつ動かなくなるかわかりません)

    $ cp /through/sample/mocha/reporters/coverlay.js /myapp/node_modules/mocha/lib/reporters/

mocha.opts に `through` を読み込むようにします。

    --require through

追加した reporter を指定して mocha を実行します。

    $ mocha --reporter coverlay

すると、coverlay.el で読み込める CSV が標準出力されます。

coverlay.el で利用するためには coverage_stats.csv ファイルに書き出す必要があります。

    $ mocha --reporter coverlay > coverage_stats.csv

これで emacs を利用して、呼び出されていない処理(行)をハイライト表示できるでしょう。

感謝
------
このプログラムを作りにあたり、
[node-bunker](https://github.com/substack/node-bunker) と
[node-burrito](https://github.com/substack/node-burrito)
は、とても参考になりました。

