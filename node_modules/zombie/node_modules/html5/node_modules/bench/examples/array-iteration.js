// testing iterating over an array various ways

var arr = []
  , i = 100000
  , j = 0
exports.countPerLap = i
while (i--) arr.push(i)
exports.compare =
  { "i < arr.length" : function () {
      j = 0
      for (var i = 0; i < arr.length; i ++) {
        j ++
      }
    }
  , "i < l" : function () {
      j = 0
      for (var i = 0, l = arr.length; i < l; i ++) {
        j ++
      }
    }
  , "arr.forEach arity=1" : function () {
      j = 0
      arr.forEach(function (_) { j ++ })
    }
  , "arr.forEach arity=3" : function () {
      j = 0
      arr.forEach(function (_,__,___) { j ++ })
    }
  }
require("../").runMain()

/*
Scores: (bigger is better)

i < l
Raw:
 > 251889.16876574306
 > 251046.0251046025
 > 251466.8901927913
 > 251677.8523489933
 > 234558.24863174354
Average (mean) 248127.63700877473

i < arr.length
Raw:
 > 193423.59767891682
 > 186219.739292365
 > 193610.8422071636
 > 193610.8422071636
 > 174367.91630340018
Average (mean) 188246.58753780182

arr.forEach arity=3
Raw:
 > 43591.979075850046
 > 43516.10095735422
 > 43402.77777777778
 > 43554.006968641115
 > 42936.88278231001
Average (mean) 43400.34951238664

arr.forEach arity=1
Raw:
 > 35112.3595505618
 > 35236.08174770966
 > 35149.3848857645
 > 35211.2676056338
 > 33590.86328518643
Average (mean) 34859.991414971235

Winner: i < l
Compared with next highest (i < arr.length), it's:
24.13% faster
1.32 times as fast
0.12 order(s) of magnitude faster

Compared with the slowest (arr.forEach arity=1), it's:
85.95% faster
7.12 times as fast
0.85 order(s) of magnitude faster
*/
