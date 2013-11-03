/* globals window */

window.onload = function () {
  var saveUser = require('./saveUser.js');
  saveUser({name: 'rose'});
};

