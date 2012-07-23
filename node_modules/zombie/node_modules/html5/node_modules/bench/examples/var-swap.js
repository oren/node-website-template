
var foo = 1
  , bar = 2

function tmpvar () {
  var _ = foo
  foo = bar
  bar = _
}
function arrswap () {
  foo = [bar, bar = foo][0]
}
function fnswap () {
  (function(x,y){foo=x;bar=y})(bar,foo)
}

exports.compare =
  { tmpvar: tmpvar
  , arrswap: arrswap
  , fnswap: fnswap
  , "nil function":function () {}
  }
