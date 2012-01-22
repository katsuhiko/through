/**
 * Module dependencies.
 */
var burrito = require('burrito'),
    EventEmitter = require('events').EventEmitter;

/**
 * Expose `Compiler`.
 */
module.exports = Compiler;

function Compiler() {
}

Compiler.prototype.__proto__ = EventEmitter.prototype;

Compiler.prototype.compile = function(src) {
  var compiler = this;
  return burrito(src, function(node) {
    compiler.emit(node.name, node);
  });
};
