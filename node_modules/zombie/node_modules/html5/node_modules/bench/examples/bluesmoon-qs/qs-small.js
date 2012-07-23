// testing iterating over an array various ways

var cnt = 10

var test = "foo=9188"

var blues = require("./bluesmoon.js")
var current = require("./current.js")

//exports.countPerLap = cnt

exports.compare =
  { "bluesmoon" : function () {
//      for (var i = 0; i < cnt; i ++) {
        var x = blues.parse(test)
      //}
    }
  , "current" : function () {
      //for (var i = 0; i < cnt; i ++) {
        var x = current.parse(test)
      //}
    }
  }
require("../../").runMain()

/*
*/
