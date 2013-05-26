'use strict';

// npm package
var ejs = require('ejs');

module.exports = {
  port: 3000, 
  engine: ejs, 
  templates: __dirname + '/../templates',
  db: require('../db/mock-db.js')
};
