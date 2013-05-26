'use strict';

var path = require("path")
var fs = require("fs")

var contacts_file = path.resolve(__dirname, "contacts.json")

module.exports.allContacts = function (cb) {
  fs.readFile(contacts_file, "utf8", function (er, data) {
    if (er) return cb(er)
    try {
      data = JSON.parse(data)
    } catch (er) {
      return cb(er)
    }
    return cb(null, data)
  });
}
