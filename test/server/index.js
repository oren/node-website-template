'use strict';

process.env.NODE_ENV = 'test';

var test = require('tape');
var http = require('http');

var config = require('../../config/test.js');

test('/health returns 200', function (t) {
  t.plan(1);

  http.get('http://localhost:3000', function(res) {
    t.equal(res.statusCode, 200)
  }).on('error', function(e) {
    console.log('Got error: ' + e.message);
  });
});

