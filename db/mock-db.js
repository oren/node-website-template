'use strict';

var path = require("path")
var fs = require("fs")

var contacts_file = path.resolve(__dirname, "contacts.json")

module.exports.allContacts = function (cb) {
  return cb(null, [{id: 1, name: 'mock-user1'}, {id: 2, name: 'mock-user2'}]);
};
