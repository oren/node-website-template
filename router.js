'use strict';

// npm packages
var router = require('routes')();

// my modules
var assets = require('./routes/static.js')

module.exports = router;

router.addRoute('/*', assets)
router.addRoute('/', require('./routes/home.js'))

