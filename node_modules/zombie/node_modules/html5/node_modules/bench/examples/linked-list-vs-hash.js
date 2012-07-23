#!/usr/bin/env node

// populate the lists

var arr = []
  , rawLL = {next:null,prev:null}
  , rawLLp = rawLL
  , rawLLarr = [rawLL]
  , classLL = new LinkedList
  , classLLp = classLL
  , classLLarr = [classLL]
  , hash = {}
  , hashArr = []
  , n = 1000000

// keep them in an array so that we can find them, and
// and also to remove GC from the equation.
console.log("populating raw linked list...")
for (var i = 0; i < n; i ++) {
  rawLLarr.push(rawLLp = rawLLp.next = {next:null, prev:rawLLp})
}
console.log("populating class linked list...")
for (var i = 0; i < n; i ++) {
  classLLarr.push(classLLp = classLLp.next = new LinkedList(classLLp))
}
console.log("populating hash...")
for (var i = 0; i < n; i ++) {
  hashArr.push(hash["key"+i] = {})
}

function LinkedList (prev, next) {
  this.prev = prev
  this.next = next
  if (this.prev) this.prev.next = this
  if (this.next) this.next.prev = this
}
LinkedList.prototype.remove = function () {
  if (this.prev) this.prev.next = this.next
  if (this.next) this.next.prev = this.prev
  this.prev = this.next = null
}
// define them so that they're on the shadow object
LinkedList.prototype.next = LinkedList.prototype.prev = null

// now bench the time to delete random entries.
// this also has some noise, due to collisions etc.

exports.compare =
  { hash : function () {
      var i = Math.floor(Math.random() * n)
      delete hash["key"+i]
    }
  , rawLL : function () {
      var i = Math.floor(Math.random() * n)
        , item = rawLLarr[i]
      if (item.prev) item.prev.next = item.next
      if (item.next) item.next.prev = item.prev
      item.prev = item.next = null
    }
  , classLL : function () {
      var i = Math.floor(Math.random() * n)
      classLLarr[i].remove()
    }
  }

require("../").runMain()

