/**
 * Module dependencies.
 */
var fs = require('fs');

/**
 * expose `config`.
 */
module.exports = config;

var merge = function(from, to) {
  for (var p in to) {
    if (to.hasOwnProperty(p)) {
      from[p] = to[p];
    }
  }
  return from;
};

function config(path, options) {
  options = options || {};
  var src;
  try {
    src = fs.readFileSync(path, 'utf8');
  } catch (err) {
    return options;
  }
  return merge(options, JSON.parse(src));
}

