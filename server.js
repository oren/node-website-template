'use strict';

// There are 2 ways to start the server:
// by running it directly with the node executable 
// or by require('./server.js'). 
// and calling start() on the returned object.
// this is mainly to be able to call it from a test file.
//
// if this file is run directly
// create the server and listen immediately
// usage: node server.js
//
// if it's being required, just create the server and return an object with start() function.
// usage:
// server = require('./server')(config)
// server.start(function(err) {
//   console.log('server is ready')
// }
//
// config argument is optional.

process.title = 'node-website-template';

// core module
var http = require('http');

// npm packages
var ErrorPage = require('error-page');
var Templar = require('templar');

// my module
var router = require('./router.js');
var server = null;

var environment = process.env.NODE_ENV || 'development';
var config = require('./config/' + environment + '.js');
var templarOptions = { engine: config.engine, folder: config.templates };
Templar.loadFolder(config.templates);

if (module === require.main) {
  server = create();
  server.listen(config.port, function() {
    console.log('Server Listening - http://localhost:' + config.port + '. ' + environment + ' environment');
  });
} else {
  module.exports = function(options) {

    // override the default config
    if (options) {
      Object.keys( options ).forEach(function ( k ) {
        config[k] = options[k]
      });
    };

    server = create();
    return {
      start: function(cb) {
        server.listen(config.port, function() {
          console.log('Server Listening - http://localhost:' + config.port + '. ' + environment + ' environment');
          cb(null);
        });
      }
    }
  }
};

function create() {
  // request goes here
  return http.createServer(function(req, res) {
    res.error = ErrorPage(req, res, {
      404: 'not found!'
    });
    res.template = Templar(req, res, templarOptions);
    router.match(req.url).fn(req, res, config);
  });
};
