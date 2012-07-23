// testing iterating over an array various ways
exports.compare =
  { "new Object" : function () {
      return new Object
    }
  , "{}" : function () {
      return {}
    }
  }
require("../").runMain()

/*
$ node new-object.js
benchmarking /Users/isaacs/dev-src/js/node-bench/examples/new-object.js
Please be patient.
{ node: '0.4.10-pre',
  v8: '3.1.8.26',
  ares: '1.7.4',
  ev: '4.4',
  openssl: '0.9.8l' }
Scores: (bigger is better)

{}
Raw:
 > 20480.51948051948
 > 20191.80819180819
 > 20313.686313686314
 > 20320.67932067932
 > 20161.83816183816
Average (mean) 20293.706293706295

new Object
Raw:
 > 19091.90809190809
 > 19497.502497502497
 > 19321.678321678322
 > 19634.365634365633
 > 19620.37962037962
Average (mean) 19433.166833166833

Winner: {}
Compared with next highest (new Object), it's:
4.24% faster
1.04 times as fast
0.02 order(s) of magnitude faster
*/
