'use strict';

// This is a simplifeid version of the server.
// everything (except for the templates) is in one file and if 
// you want to test it you have to run it before running the tests.
//
// usage 
// node simple-server.js

process.title = 'node-website-template';

// core module
var http = require('http');

// npm packages
var ErrorPage = require('error-page');
var Templar = require('templar');
var router = require('routes')();

var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var templarOptions = { engine: config.engine, folder: config.templates };
Templar.loadFolder(config.templates);

router.addRoute('/*', require('./routes/static.js'))
router.addRoute('/', require('./routes/home.js'))

http.createServer(function(req, res) {
  res.error = ErrorPage(req, res, {
    404: 'not found!'
  });
  res.template = Templar(req, res, templarOptions);
  router.match(req.url).fn(req, res, config);
}).listen(config.port);

console.log('Server Listening - http://localhost:' + config.port + '. ' + environment + ' environment');
