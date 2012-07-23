#!/usr/bin/env node

module.exports = null

if (module !== require.main) return

var path = require("path")
  , url = require("url")
  , util = require("util")

var args = process.argv.slice(0)

for ( var arg = args.shift()
    ; arg !== __filename && path.basename(arg) !== "node-bench"
    ; arg = args.shift() );

// strip the extension.
var test = url.resolve(process.cwd()+"/", path.join(
    path.dirname(args[0]),
    path.basename(args[0], path.extname(args[0]))
  ))
 , bench = require("./bench")

util.puts("benchmarking "+test+"\nPlease be patient.")
test = require(test)

if (test.stepsPerLap) bench.STEPS_PER_LAP = test.stepsPerLap

bench.compare
  ( test.compare
  , test.compareCount || bench.COMPARE_COUNT
  , test.time || bench.TIME
  , test.countPerLap || bench.COUNT_PER_LAP
  , function (er, data) { (test.done || bench.show)(data) }
  )
