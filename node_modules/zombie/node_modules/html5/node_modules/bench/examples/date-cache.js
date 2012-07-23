#!/usr/bin/env node

var dateCache = null
function utcCached () {
  if (dateCache) return dateCache;
  dateCache = new Date().toUTCString();
  setTimeout(function () {
    dateCache = null
  }, 1000)
  return dateCache;
}

function utcCached2 () {
  if (!date_cache) {
    update_date();
  }
  return date_cache;
}
function update_date() {
  date_cache = new Date().toUTCString();
  setTimeout(update_date, 1000);
}

function utc () {
  return new Date().toUTCString()
}

exports.time = 10000;
exports.compare =
  { "cached" : utcCached
  , "uncached" : utc
  }

require("../").runMain()
