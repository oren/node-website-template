#!/usr/bin/env node

function fn () { return [1,2,3,4,5,6,7,8,9,0] }
try {
  function in_try () { return [1,2,3,4,5,6,7,8,9,0] }
  throw "it's ok, really"
} catch (ex) {
  function in_catch () { return [1,2,3,4,5,6,7,8,9,0] }
} finally {
  function in_finally () { return [1,2,3,4,5,6,7,8,9,0] }
}

exports.compare =
  { in_try: in_try
  , in_catch: in_catch
  , in_finally: in_finally
  , fn: fn
  }

// bump up the numbers so that it's measurable, since this is so fast.
exports.compareCount = 20;
exports.time = 1000;

require("../").runMain()
