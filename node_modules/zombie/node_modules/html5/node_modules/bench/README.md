# node bench

A little utility for doing side-by-side benchmarks in
[nodejs](http://nodejs.org).

This is not for benchmarking your HTTP servers.  Use
[ab](http://httpd.apache.org/docs/2.0/programs/ab.html) for that.

## Installation

    npm install bench

## Usage

Write your script like this:

    exports.compare = {
      "function wrapper" : function () {
        var x = (function (a) {
          return a;
        })("foo");
      },
      "with(){} wrapper" : function () {
        var x;
        with ({a : "foo"}) {
          x = a;
        }
      }
      "no wrapper" : function () {
        var a = "foo";
        var x = a;
      }
    };
    require("bench").runMain()

Then, start it up with node.

    $ node my-test-script.js

It'll output the scores in processes/ms, so a higher score is always better.
That is, the values are kHz, not Hz.

You can also export `time`, `count`, and `comparecount` to change the
behavior slightly.

Your test script is just a plain old commonjs module, so it can include other
things, update require.paths, whatever setup you need to do.  Generally, it's
a good idea to do this stuff in the module itself, rather than in the
comparison functions, so that you can better isolate the units that you
want to test.

## Fields

Export the following fields from your benchmark script.

`compare` - The hash of functions that will be compared.  The output will
use the object key as the title.  They're called without any arguments, in
the default scope.  It's assumed that you should know how to make this do
whatever you need it to.

`time` - How long (in ms) to run the tests for.  A higher value will result
in more accurate tests that take longer to run.  Default: `1000`

`compareCount` - How many times to do the test runs.  This should be some
fairly small number.  Tests are run multiple times in varying order to
average out the variation due to calling one function first, a primed
cache, garbage collection, etc.  Higher value = more accurate, slower
tests.  Default: `8`

`countPerLap` - Especially when doing asynchronous benchmarking, you may
want to structure your functions so that they run a bunch of times before
continuing.  In these cases, to make your scores reflect the actual number
of processes per ms, indicate the number of runs per call in the
"countPerLap" field.  Default: `1`

`done` - A function that will be called with the results of the runs
when they're complete.  By default, this calls a function that will
analyze the results a bit and write the data to `stdout`.

## Asynchronous Benchmarking

Just write your functions so that they take a single argument.  That
argument is your callback.  Have fun with it.

Your callback will be fired using `process.nextTick`.  This has a wee
bit of overhead, so if you're testing something really fast, you should
probably construct it to run many times before calling the callback.
Check the `examples/nexttick-vs-settimeout.js` test for an example.

# <span style="background:red; color:white">WARNING!</span>

Statistics are powerful tools, and in the wrong hands, can lead to a
lot of mayhem.  Please use this tool for good, and not evil.
