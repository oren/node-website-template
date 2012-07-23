#!/usr/local/bin/node-bench

exports.compare = {
  "with(){}" : require("./with").test,
  "function(){}" : require("./func").test
};

