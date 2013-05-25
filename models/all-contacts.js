'use strict';

module.exports = allContacts;

var path = require("path")
var contacts_file = path.resolve(__dirname, "contacts.json")
var fs = require("fs")

var cache = null

fs.watch(contacts_file, function () {
  allContacts(true, function () {})
})

function allContacts (force, cb) {
  if (typeof cb !== "function") cb = force, force = false
  if (!force && cache) {
    return cb(null, cache)
  };

  fs.readFile(contacts_file, "utf8", function (er, data) {
    if (er) return cb(er)
    try {
      data = JSON.parse(data)
    } catch (er) {
      return cb(er)
    }
    return cb(null, cache = data)
  });
}
