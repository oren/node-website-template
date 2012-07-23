#!/usr/bin/env node

function fn (a,b,c) { return [a,b,c] };

var o = {"foo":1, method : fn};

function fnCall () {
  fn.call(o,1,2,3);
}

function fnApply () {
  fn.apply(o,[1,2,3]);
}

function fnDirect () {
  fn(o,1,2,3);
}

function method () {
  o.method(1,2,3);
}
exports.compareCount = 20;
exports.time = 1000;
exports.compare =
  { "fn()" : fnDirect
  , "fn.apply()" : fnApply
  , "fn.call()" : fnCall
  , "method()" : method
  };

require("../").runMain()
