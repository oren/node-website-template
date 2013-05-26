'use strict';

process.title = 'node-website-template';

// core module
var http = require('http');

// npm packages
var ErrorPage = require('error-page');
var Templar = require('templar');

// my module
var router = require('./router.js');

var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var templarOptions = { engine: config.engine, folder: config.templates };
Templar.loadFolder(config.templates);

// request goes here
var server = http.createServer(function(req, res) {
  
  res.error = ErrorPage(req, res, {
    404: 'not found!'
  });
  res.template = Templar(req, res, templarOptions);
  router.match(req.url).fn(req, res);

});

// if this file is run directly (node server.js) 
if (module === require.main) {
  server.listen(config.port, function() {
    console.log('Server Listening - http://localhost:' + config.port + '. ' + environment + ' environment');
  });
} else { // if it was required
  module.exports.start = function(cb) {
    server.listen(config.port, function() {
      console.log('Server Listening - http://localhost:' + config.port + '. ' + environment + ' environment');
      cb(null);
    });
  }
};

