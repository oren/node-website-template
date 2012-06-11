module.exports = assets;

var path = require('path');
var fs = require('fs');

function assets(req, res) {
  var file = path.join('public', req.url)

  fs.readFile(file, function (err, data) {
    if (err) {
      res.statusCode = 404;
      return res.end();
    }

    res.end(data);
  })
};
