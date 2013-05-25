'use strict';

module.exports = assets;

var path = require('path');
var fs = require('fs');

function assets(req, res) {
  fs.readFile(req.url.substr(1), function (err, data) {
    if (err) {
      return res.error(404);
    }

    res.end(data);
  })
};
