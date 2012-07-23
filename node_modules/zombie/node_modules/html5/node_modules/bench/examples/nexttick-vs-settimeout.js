
// run many times so that we can abstract out the overhead of promise creation.
var count = 500;

exports.countPerLap = count;
exports.compare = {
  nextTick : function (done) {
    var i = 0;
    process.nextTick(function () {
      if (i ++ > count) done();
      else process.nextTick(arguments.callee);
    });
  },
  setTimeout : function (done) {
    var i = 0;
    setTimeout(function () {
      if (i ++ > count) done();
      else setTimeout(arguments.callee);
    });
  }
}
