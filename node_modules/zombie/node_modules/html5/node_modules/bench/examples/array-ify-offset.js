// testing converting arguments to an Array

function duff () {
  var l = arguments.length
  var arr = new Array(l - 1)
  switch (l) {
    case 8: arr[6] = arguments[7]
    case 7: arr[5] = arguments[6]
    case 6: arr[4] = arguments[5]
    case 5: arr[3] = arguments[4]
    case 4: arr[2] = arguments[3]
    case 3: arr[1] = arguments[2]
    case 2: arr[0] = arguments[1]
  }
  return arr
}

function manualMap () {
  var l = arguments.length
  var arr = new Array(l - 1)
  for (var i = 1; i < l; i ++) arr[i - 1] = arguments[i]
  return arr
}

function manualMapArg (x) {
  var l = arguments.length
  var arr = new Array(l - 1)
  for (var i = 1; i < l; i ++) arr[i - 1] = arguments[i]
  return arr
}

function arrayApply () {
  var a = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
  a.shift()
  return a
}

function arrayApplyArg (x) {
  var a = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
  a.shift()
  return a
}

function sliceCall () {
  return Array.prototype.slice.call(arguments, 1)
}

function sliceCallArg (x) {
  return Array.prototype.slice.call(arguments, 1)
}

function sliceApply () {
  return Array.prototype.slice.apply(arguments, [1])
}

function sliceApplyArg (x) {
  return Array.prototype.slice.apply(arguments, [1])
}

exports.compare =
  { manualMap: function () {
      return [ manualMap(Math.random()), manualMap(Math.random(), Math.random()) ]
    }
  , manualMapArg: function () {
      return [ manualMapArg(Math.random()), manualMapArg(Math.random(), Math.random()) ]
    }
  , arrayApply: function () {
      return [ arrayApply(Math.random()), arrayApply(Math.random(), Math.random()) ]
    }
  , arrayApplyArg: function () {
      return [ arrayApplyArg(Math.random()), arrayApplyArg(Math.random(), Math.random()) ]
    }
  , sliceCall: function () {
      return [ sliceCall(Math.random()), sliceCall(Math.random(), Math.random()) ]
    }
  , sliceCallArg: function () {
      return [ sliceCallArg(Math.random()), sliceCallArg(Math.random(), Math.random()) ]
    }
  , sliceApply: function () {
      return [ sliceApply(Math.random()), sliceApply(Math.random(), Math.random()) ]
    }
  , sliceApplyArg: function () {
      return [ sliceApplyArg(Math.random()), sliceApplyArg(Math.random(), Math.random()) ]
    }
  , duff: function () {
      return [ duff(Math.random()), duff(Math.random(), Math.random()) ]
    }
  }

exports.countPerLap = 2

require("../").runMain()

/*
benchmarking /Users/isaacs/dev-src/js/node-bench/examples/array-ify-offset.js
Please be patient.
{ node: '0.5.2-pre',
  v8: '3.4.12.1',
  ares: '1.7.4',
  uv: '0.1',
  openssl: '0.9.8l' }
Scores: (bigger is better)

manualMap
Raw:
 > 11234.765234765235
 > 10805.194805194806
 > 11004.995004995006
 > 8633.366633366633
 > 9564.435564435564
Average (mean) 10248.551448551449

manualMapArg
Raw:
 > 8611.388611388611
 > 10685.884691848907
 > 8375.624375624375
 > 9148.851148851149
 > 9036.963036963038
Average (mean) 9171.742372935216

arrayApply
Raw:
 > 7474.525474525474
 > 7252.747252747253
 > 7146.853146853146
 > 6769.2307692307695
 > 6839.160839160839
Average (mean) 7096.5034965034965

arrayApplyArg
Raw:
 > 5818.181818181818
 > 6867.132867132867
 > 5998.001998001998
 > 6507.433102081269
 > 6543.456543456544
Average (mean) 6346.8412657709

sliceApply
Raw:
 > 2299.7002997002996
 > 2297.7022977022975
 > 2237.762237762238
 > 2045.954045954046
 > 2005.994005994006
Average (mean) 2177.422577422577

sliceCall
Raw:
 > 1962.0758483033933
 > 1792.2077922077922
 > 1768.2317682317682
 > 1707.1713147410358
 > 1790.4191616766468
Average (mean) 1804.021177032127

sliceCallArg
Raw:
 > 137.65978367748278
 > 136.9047619047619
 > 142.85714285714286
 > 135.05461767626613
 > 132.80475718533202
Average (mean) 137.05621266019716

sliceApplyArg
Raw:
 > 136.9047619047619
 > 134.9206349206349
 > 129.66601178781926
 > 131.73652694610777
 > 129.74051896207584
Average (mean) 132.59369090427995

Winner: manualMap
Compared with next highest (manualMapArg), it's:
10.51% faster
1.12 times as fast
0.05 order(s) of magnitude faster

Compared with the slowest (sliceApplyArg), it's:
98.71% faster
77.29 times as fast
1.89 order(s) of magnitude faster
*/
