#!/usr/bin/env node

var p = [], l = [], c = [], f = [],
  pi = 0, li = 0, ci = 0, fi = 0,
  n = 100000;


function push (a, i) {
  a[a.length] = i;
}


exports.compare = {
  push : function () {
    if (pi === n) {
      p = [];
      pi = 0;
    }
    p.push(pi ++);
  },
  length : function () {
    if (li === n) {
      l = [];
      li = 0;
    }
    l[l.length] = li ++;
  },
  fakePush : function () {
    if (fi === n) {
      f = [];
      fi = 0;
    }
    push(f, fi ++);
  },
  counter : function () {
    if (ci === n) {
      c = [];
      ci = 0;
    }
    c[ci] = ci ++;
  }
}

require("../").runMain()

/**
benchmarking /Users/isaacs/Documents/src/js/node-bench/examples/push-vs-length
Please be patient.
Scores: (bigger is better)

counter
Raw:
 > 17611.38861138861
 > 17376.623376623378
 > 17229.77022977023
Average (mean) 17405.927405927407

length
Raw:
 > 16734.265734265733
 > 16443.556443556445
 > 16023.976023976023
Average (mean) 16400.5994005994

fakePush
Raw:
 > 15218.78121878122
 > 14850.14985014985
 > 14909.09090909091
Average (mean) 14992.673992673992

push
Raw:
 > 14062.937062937062
 > 13960.03996003996
 > 13778.221778221778
Average (mean) 13933.732933732934

Winner: counter
Compared with next highest (length), it's:
5.78% faster
1.06 times as fast
0 order(s) of magnitude faster

Compared with the slowest (push), it's:
19.95% faster
1.25 times as fast
0 order(s) of magnitude faster
**/

