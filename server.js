//core modules
var http = require('http');
var path = require('path');
var fs = require('fs');

//non-core modules
var mapleTree = require('mapleTree');
var ErrorPage = require('error-page');
var Templar = require('templar');
var ejs = require('ejs');

var config = { port: 3000, engine: ejs, templates: './templates' };
var templarOptions = { engine: config.engine, folder: config.templates };
var router = new mapleTree.RouteTree();
Templar.loadFolder('./templates')

// home route
router.define( '/', require('./routes/home.js') );

// route static files
router.define('/*', function (req, res) {
  var file = path.join('public', req.url)

  fs.readFile(file, function (err, data) {
    if (err) {
      res.statusCode = 404;
      return res.end();
    }

    res.end(data);
  })
})

// request goes here
http.createServer(function(req, res) {
  res.error = ErrorPage(req, res, {});
  res.template = Templar(req, res, templarOptions);

  router.match(req.url).fn(req, res);

}).listen(process.env.PORT || config.port);

