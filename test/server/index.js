'use strict';

var test = require('tape');
var http = require('http');

var config = require('../../config/test.js');
var server = require('../../server.js')(config);

test('/health returns 200', function (t) {
  t.plan(1);

  server.start(function (err) {
    if (err) {
      throw err;
    };

    http.get('http://localhost:3000', function(res) {
      t.equal(res.statusCode, 200)
    }).on('error', function(e) {
      console.log('Got error: ' + e.message);
    });
  });
});

