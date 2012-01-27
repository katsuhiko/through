
/**
 * Module dependencies.
 */

var Base = require('./base');

/**
 * Expose `Coverlay`.
 */

exports = module.exports = Coverlay;

/**
 * Initialize a new `Coverlay` reporter.
 *
 * @param {Runner} runner
 * @api public
 */

function Coverlay(runner) {
  Base.call(this, runner);

  runner.on('end', function(){
    var outLine = function(path, line, count) {
      console.log(path + ',' + line + ',' + count);
    };
    var outFile = function(path, values) {
      for (var i = 0; i < values.length; i++) {
        if (values[i] !== undefined) {
          outLine(path, (i + 1), values[i]);
        }
      }
    };
    var out = function(result) {
      for (var path in result) {
        if (result.hasOwnProperty(path)) {
          outFile(path, result[path]);
        }
      }
    };

    out(global.through.result);
 });
}
