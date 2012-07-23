#!/usr/bin/env node

function fn () { return this }
var obj = {}

Function.prototype.fakeBind = function (o) {
  var fn = this
    , args = Array.prototype.slice.call(arguments, 1)
  return function () { return fn.apply(o, args.concat(Array.prototype.slice.call(arguments))) }
}

var fakeBind = fn.fakeBind(obj)
var realBind = fn.bind(obj)

exports.compareCount = 20;
exports.time = 1000;
exports.compare =
  { "realBind" : realBind
  , "fakeBind" : fakeBind
  , "unbound" : fn
  }

require("../").runMain()

// [20:58:33] $ node examples/bind.js 
// benchmarking /Users/isaacs/Documents/src/js/node-bench/examples/bind.js
// Please be patient.
// Scores: (bigger is better)
// 
// unbound
// Raw:
//  > 89258.74125874125
//  > 81932.06793206793
//  > 44023.48336594912
//  > 89700.2997002997
//  > 89641.35864135865
//  > 89409.59040959041
//  > 89460.53946053945
//  > 89780.21978021978
//  > 89021.97802197802
//  > 89615.38461538461
//  > 82308.69130869131
//  > 82429.57042957043
//  > 87700.2997002997
//  > 88228.77122877123
//  > 88332.66733266733
//  > 89534.46553446553
//  > 89936.06393606393
//  > 89664.33566433567
//  > 82490.50949050949
//  > 81840.15984015985
//  > 79153.84615384616
// Average (mean) 84926.81160978618
// 
// realBind
// Raw:
//  > 17295.704295704294
//  > 17407.59240759241
//  > 6811.822660098522
//  > 17399.6003996004
//  > 17410.58941058941
//  > 17410.58941058941
//  > 17399.6003996004
//  > 17183.816183816183
//  > 13736.263736263736
//  > 17192.80719280719
//  > 16563.436563436564
//  > 16083.916083916083
//  > 15868.131868131868
//  > 17297.702297702297
//  > 17319.68031968032
//  > 17334.665334665333
//  > 17346.653346653347
//  > 16971.028971028973
//  > 17388.61138861139
//  > 17455.544455544456
//  > 17124.875124875125
// Average (mean) 16476.315802424175
// 
// fakeBind
// Raw:
//  > 979.020979020979
//  > 982.017982017982
//  > 861.1388611388611
//  > 473.5264735264735
//  > 977.022977022977
//  > 977.022977022977
//  > 971.028971028971
//  > 977.022977022977
//  > 978.021978021978
//  > 982.017982017982
//  > 962.0379620379621
//  > 968.0319680319681
//  > 961.038961038961
//  > 975.024975024975
//  > 979.020979020979
//  > 975.024975024975
//  > 975.024975024975
//  > 975.024975024975
//  > 981.018981018981
//  > 961.038961038961
//  > 980.01998001998
// Average (mean) 945.2452309595167
// 
// Winner: unbound
// Compared with next highest (realBind), it's:
// 80.6% faster
// 5.15 times as fast
// 0 order(s) of magnitude faster
// 
// Compared with the slowest (fakeBind), it's:
// 98.89% faster
// 89.85 times as fast
// 1 order(s) of magnitude faster
