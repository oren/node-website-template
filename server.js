//core modules
var http = require('http');

//non-core modules
var ErrorPage = require('error-page');
var Templar = require('templar');
var ejs = require('ejs');

var config = { port: 3000, engine: ejs, templates: './templates' };
var templarOptions = { engine: config.engine, folder: config.templates };
Templar.loadFolder('./templates')

var router = require('routes')();

var static = require('./routes/static.js')

router.addRoute('/*', static)
router.addRoute('/', require('./routes/home.js'))

// request goes here
http.createServer(function(req, res) {

  res.error = ErrorPage(req, res, {
    404: 'not found!'
  });
  res.template = Templar(req, res, templarOptions);
  router.match(req.url).fn(req, res);

}).listen(process.env.PORT || config.port, function() {
  console.log('Server Listening on Port ' + config.port + '. development environment');
});


