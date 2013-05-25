'use strict';

// npm packages
var st = require('st')

var mount = st(process.cwd());

module.exports = function (req, res) {
  if (!mount(req, res)) return res.error(404)
};
