// testing iterating over an array various ways

var cnt = 10

var test = "foo=918854443121279438895193&foo=bar&foo=bar&foo=quux&foo=1&bar=2&my+weird+field=q1%212%22%27w%245%267%2Fz8%29%3F&my%20weird%20field=q1!2%22\'w%245%267%2Fz8)%3F&foo%3Dbaz=bar&foo=baz=bar&foo=baz%3Dbar&str=foo&arr=1&arr=2&arr=3&somenull=&undef=& foo = bar &%20foo%20=%20bar%20&foo=%zx&foo=%25zx&foo=%EF%BF%BD&hasOwnProperty=x&toString=foo&valueOf=bar&__defineGetter__=baz"

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
