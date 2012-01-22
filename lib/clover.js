/**
 * Module dependencies.
 */
var fs = require('fs'),
    config = require('./config'),
    Coverage = require('./coverage'),
    Compiler = require('./compiler');

/**
 * version.
 */
exports.version = '0.0.1';

var opt = {
  globalName: "clover",
  target: ".*lib.*\\.js$",
  charset: "utf8"
};
opt = config('./test/clover.json', opt);

(function(g, c) {
  if (!g[c]) {
    g[c] = new Coverage();
  }
}(global, opt.globalName));

var compile = (function(g, c) {
  return function(src, filename) {
    var preStat = function(node) {
      g[c].register(filename, node.start.line);
      node.wrap('{' + c + '.pass(__filename, '
        + node.start.line + '); %s}');
    };
    var wrapStat = function(node) {
      g[c].register(filename, node.start.line);
      node.wrap(c + '.pass(__filename, '
        + node.start.line + ')(%s)');
    };

    var compiler = new Compiler();
    compiler.on('call', wrapStat);
    compiler.on('stat', preStat);
    compiler.on('var', preStat);
    compiler.on('throw', preStat);
    compiler.on('binary', wrapStat);
    compiler.on('unary-postfix', wrapStat);
    compiler.on('unary-prefix', wrapStat);
    compiler.on('name', function(node) {
      if (!g[c].registered(filename, node.start.line)) {
        wrapStat(node);
      }
    });

    return compiler.compile(src);
  };
}(global, opt.globalName));

(function(target, charset) {
  var handler = require.extensions['.js'];
  require.extensions['.js'] = function(module, filename) {
    if (target.test(filename)) {
      var src = fs.readFileSync(filename, charset);
      src = compile(src, filename);
      module._compile(src, filename);
    } else {
      handler(module, filename);
    }
  };
}(new RegExp(opt.target), opt.charset));
