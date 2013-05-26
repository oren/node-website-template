'use strict';

// npm packages
var router = require('routes')();

module.exports = router;

router.addRoute('/*', require('./routes/static.js'))
router.addRoute('/', require('./routes/home.js'))

