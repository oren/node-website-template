#!/usr/bin/env node

function fn () { return [1,2,3,4,5,6,7,8,9,0] }
function noop () {}
function throws () { throw new Error("yo") }
function throwsString () { throw "yo" }
function tc (fn) { return function () { try { fn() } catch (ex) {} } }

exports.compare =
  { doesStuffNoTC : fn
  , noopNoTC : noop
  , doesStuffTC : tc(fn)
  , noopTC : tc(noop)
  , throwsString : tc(throwsString)
  , throws : tc(throws)
  }

// bump up the numbers so that it's measurable, since this is so fast.
exports.compareCount = 20;
exports.time = 1000;

require("../").runMain()
