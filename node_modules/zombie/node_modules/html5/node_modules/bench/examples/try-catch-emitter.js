#!/usr/bin/env node

var x = new (require("events").EventEmitter)

x.on("bar", function () { })

function noTC () { x.emit("foo") }
function withTC () { try { x.emit("foo") } catch (ex) { x.emit("error", ex) }}

function barNoTC () { x.emit("bar") }
function barTC () { try { x.emit("bar") } catch (ex) { x.emit("error", ex) }}

exports.compare =
  { noTC : noTC, withTC : withTC,
listenerNoTC : barNoTC,listenerTC : barTC
}

// bump up the numbers so that it's measurable, since this is so fast.
exports.compareCount = 20;
exports.time = 1000;

require("../").runMain()
