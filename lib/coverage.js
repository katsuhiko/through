/**
 * Module dependencies.
 */

/**
 * Expose `Coverage`.
 */
module.exports = Coverage;

function Coverage() {
  this.result = [];
}

Coverage.prototype.register = function(name, line) {
  if (!this.result[name]) {
    this.result[name] = [];
  }
  this.result[name][line] = 0;
};

Coverage.prototype.registered = function(name, line) {
  return (this.result[name][line] !== undefined);
}

Coverage.prototype.pass = function(name, line) {
  if (!this.registered(name, line)) {
    this.register(name, line);
  }
  this.result[name][line] = this.result[name][line] + 1;
  return function(expr) {
    return expr;
  };
};
