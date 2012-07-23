// testing converting arguments to an Array

function manualMap () {
  var l = arguments.length
  var arr = new Array(l)
  for (var i = 0; i < l; i ++) arr[i] = arguments[i]
  return arr
}

function manualMapArg (x) {
  var l = arguments.length
  var arr = new Array(l)
  for (var i = 0; i < l; i ++) arr[i] = arguments[i]
  return arr
}

function duff () {
  var l = arguments.length
  var arr = new Array(l)
  switch (l) {
    case 8: arr[7] = arguments[7]
    case 7: arr[6] = arguments[6]
    case 6: arr[5] = arguments[5]
    case 5: arr[4] = arguments[4]
    case 4: arr[3] = arguments[3]
    case 3: arr[2] = arguments[2]
    case 2: arr[1] = arguments[1]
    case 1: arr[0] = arguments[0]
  }
  return arr
}

function arrayApply () {
  return arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
}

function arrayApplyArg (x) {
  return arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)
}

function sliceCall () {
  return Array.prototype.slice.call(arguments)
}

function sliceCallArg (x) {
  return Array.prototype.slice.call(arguments)
}

function sliceZeroCall () {
  return Array.prototype.slice.call(arguments, 0)
}

function sliceZeroCallArg (x) {
  return Array.prototype.slice.call(arguments, 0)
}

function sliceApply () {
  return Array.prototype.slice.apply(arguments)
}

function sliceApplyArg (x) {
  return Array.prototype.slice.apply(arguments)
}

function sliceZeroApply () {
  return Array.prototype.slice.apply(arguments, [0])
}

function sliceZeroApplyArg (x) {
  return Array.prototype.slice.apply(arguments, [0])
}

function arrayProto () {
  arguments.__proto__ = Array.prototype
  return arguments
}

exports.compare =
  { manualMap: function () {
      return [ manualMap(Math.random()), manualMap(Math.random(), Math.random()) ]
    }
  , arrayProto: function () {
      return [ arrayProto(Math.random()), arrayProto(Math.random(), Math.random()) ]
    }
  , duff: function () {
      return [ duff(Math.random()), duff(Math.random(), Math.random()) ]
    }
  , arrayApply: function () {
      return [ arrayApply(Math.random()), arrayApply(Math.random(), Math.random()) ]
    }
  //, manualMapArg: function () {
  //    return [ manualMapArg(Math.random()), manualMapArg(Math.random(), Math.random()) ]
  //  }
  //, arrayApplyArg: function () {
  //    return [ arrayApplyArg(Math.random()), arrayApplyArg(Math.random(), Math.random()) ]
  //  }
  //, sliceCall: function () {
  //    return [ sliceCall(Math.random()), sliceCall(Math.random(), Math.random()) ]
  //  }
  //, sliceCallArg: function () {
  //    return [ sliceCallArg(Math.random()), sliceCallArg(Math.random(), Math.random()) ]
  //  }
  //, sliceZeroCall: function () {
  //    return [ sliceZeroCall(Math.random()), sliceZeroCall(Math.random(), Math.random()) ]
  //  }
  //, sliceZeroCallArg: function () {
  //    return [ sliceZeroCallArg(Math.random()), sliceZeroCallArg(Math.random(), Math.random()) ]
  //  }
  //, sliceApply: function () {
  //    return [ sliceApply(Math.random()), sliceApply(Math.random(), Math.random()) ]
  //  }
  //, sliceApplyArg: function () {
  //    return [ sliceApplyArg(Math.random()), sliceApplyArg(Math.random(), Math.random()) ]
  //  }
  //, sliceZeroApply: function () {
  //    return [ sliceZeroApply(Math.random()), sliceZeroApply(Math.random(), Math.random()) ]
  //  }
  //, sliceZeroApplyArg: function () {
  //    return [ sliceZeroApplyArg(Math.random()), sliceZeroApplyArg(Math.random(), Math.random()) ]
  //  }
  }

exports.countPerLap = 2

require("../").runMain()

/*

benchmarking /Users/isaacs/dev-src/js/node-bench/examples/array-ify.js
Please be patient.
{ node: '0.5.2-pre',
  v8: '3.4.12.1',
  ares: '1.7.4',
  uv: '0.1',
  openssl: '0.9.8l' }
Scores: (bigger is better)

arrayApply
Raw:
 > 11778.221778221778
 > 12207.792207792209
 > 12815.184815184815
 > 10159.84015984016
 > 12595.404595404596
Average (mean) 11911.288711288711

manualMap
Raw:
 > 10637.362637362638
 > 10522.432701894317
 > 11186.813186813188
 > 9558.441558441558
 > 11064.935064935065
Average (mean) 10593.997029889355

arrayApplyArg
Raw:
 > 9370.62937062937
 > 9648.351648351649
 > 9518.481518481518
 > 9866.133866133867
 > 9996.003996003996
Average (mean) 9679.92007992008

manualMapArg
Raw:
 > 9880.11988011988
 > 9332.667332667334
 > 9550.44955044955
 > 9154.845154845154
 > 10463.536463536464
Average (mean) 9676.323676323675

sliceZeroApply
Raw:
 > 2339.6603396603396
 > 2355.6443556443555
 > 2337.6623376623374
 > 2281.7182817182816
 > 2305.3892215568862
Average (mean) 2324.01490724844

sliceApply
Raw:
 > 2115.884115884116
 > 2185.8141858141857
 > 2175.8241758241757
 > 2223.552894211577
 > 2151.8481518481517
Average (mean) 2170.584704716441

sliceCall
Raw:
 > 2131.868131868132
 > 2029.97002997003
 > 1982.017982017982
 > 2031.968031968032
 > 2049.95004995005
Average (mean) 2045.154845154845

sliceZeroCall
Raw:
 > 2071.928071928072
 > 2001.998001998002
 > 2105.577689243028
 > 1942.057942057942
 > 2039.96003996004
Average (mean) 2032.304349037417

sliceZeroCallArg
Raw:
 > 129.4820717131474
 > 134.65346534653466
 > 128.8404360753221
 > 128.7128712871287
 > 128.8404360753221
Average (mean) 130.10585609949098

sliceZeroApplyArg
Raw:
 > 129.4820717131474
 > 131.34328358208955
 > 129.03225806451613
 > 128.96825396825398
 > 129.35323383084577
Average (mean) 129.63582023177054

sliceCallArg
Raw:
 > 127.11022840119166
 > 124.62908011869436
 > 126.23274161735701
 > 128.8404360753221
 > 123.50597609561753
Average (mean) 126.06369246163653

sliceApplyArg
Raw:
 > 128.33168805528135
 > 121.27236580516899
 > 122.2879684418146
 > 120.67260138476756
 > 120.67260138476756
Average (mean) 122.64744501436

Winner: arrayApply
Compared with next highest (manualMap), it's:
11.06% faster
1.12 times as fast
0.05 order(s) of magnitude faster

Compared with the slowest (sliceApplyArg), it's:
98.97% faster
97.12 times as fast
1.99 order(s) of magnitude faster

*/
