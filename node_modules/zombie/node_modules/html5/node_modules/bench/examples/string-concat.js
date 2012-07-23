#!/usr/bin/env node

var stringCount = 1000
var stringSize = 100
var string = new Array(stringSize + 1).join("x")

var array = new Array(stringCount)
for (var i = 0; i < stringCount; i ++) array[i] = string

function arrayJoinPrebuilt () {
  return array.join("")
}

function arrayJoinNewArray () {
  var a = new Array(stringCount)
  for (var i = 0; i < stringCount; i ++) a[i] = string
  return a.join("")
}

function arrayJoinPush () {
  var a = []
  for (var i = 0; i < stringCount; i ++) a.push(string)
  return a.join("")
}

function strcat () {
  var s = ""
  for (var i = 0; i < stringCount; i ++) s += string
  return s
}

// exports.compareCount = 20;
exports.time = 1000;
exports.compare =
  { arrayJoinPrebuilt: arrayJoinPrebuilt
  , arrayJoinNewArray: arrayJoinNewArray
  , arrayJoinPush: arrayJoinPush
  , strcat: strcat
  }

require("bench").runMain()

/*

$ node string-concat.js
benchmarking /Users/isaacs/dev-src/js/node-bench/examples/string-concat.js
Please be patient.
{ node: '0.5.11-pre',
  v8: '3.7.0',
  ares: '1.7.5-DEV',
  uv: '0.1',
  openssl: '0.9.8l' }
Scores: (bigger is better)

strcat
Raw:
 > 41.95804195804196
 > 44.11764705882353
 > 33.864541832669325
 > 33.78378378378378
 > 33.898305084745765
Average (mean) 37.52446394361287

arrayJoinPrebuilt
Raw:
 > 16.488845780795344
 > 16.488845780795344
 > 15.748031496062993
 > 14.880952380952381
 > 14.8975791433892
Average (mean) 15.700850916399052

arrayJoinNewArray
Raw:
 > 14.77832512315271
 > 14.720314033366044
 > 13.712047012732615
 > 13.579049466537342
 > 13.793103448275861
Average (mean) 14.116567816812914

arrayJoinPush
Raw:
 > 14.204545454545455
 > 14.245014245014245
 > 14.177693761814744
 > 12.658227848101266
 > 12.88404360753221
Average (mean) 13.633904983401584

Winner: strcat
Compared with next highest (arrayJoinPrebuilt), it's:
58.16% faster
2.39 times as fast
0.38 order(s) of magnitude faster

Compared with the slowest (arrayJoinPush), it's:
63.67% faster
2.75 times as fast
0.44 order(s) of magnitude faster

*/
