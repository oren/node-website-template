'use strict';

module.exports = assets;

var path = require('path');
var fs = require('fs');

function assets(req, res) {
  var file = path.join('public', req.url)

  fs.readFile(file, function (err, data) {
    if (err) {
      return res.error(404);
    }

    res.end(data);
  })
};
