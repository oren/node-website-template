;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* globals window */

window.onload = function () {
  var saveUser = require('./saveUser.js');
  saveUser({name: 'rose'});
};


},{"./saveUser.js":2}],2:[function(require,module,exports){
module.exports = function (user, cb) {
  // save user in our DB. in the real scenario this will be an async call to an http endpoint
  setTimeout(function () {
    console.log('user ' + user.name + ' was saved in the db');
    cb && cb(200);
  });
};

},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvaG9tZS9vcmVuL3Byb2plY3RzL25vZGUtd2Vic2l0ZS10ZW1wbGF0ZS9wdWJsaWMvanMvYXBwLmpzIiwiL2hvbWUvb3Jlbi9wcm9qZWN0cy9ub2RlLXdlYnNpdGUtdGVtcGxhdGUvcHVibGljL2pzL3NhdmVVc2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBnbG9iYWxzIHdpbmRvdyAqL1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICB2YXIgc2F2ZVVzZXIgPSByZXF1aXJlKCcuL3NhdmVVc2VyLmpzJyk7XG4gIHNhdmVVc2VyKHtuYW1lOiAncm9zZSd9KTtcbn07XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVzZXIsIGNiKSB7XG4gIC8vIHNhdmUgdXNlciBpbiBvdXIgREIuIGluIHRoZSByZWFsIHNjZW5hcmlvIHRoaXMgd2lsbCBiZSBhbiBhc3luYyBjYWxsIHRvIGFuIGh0dHAgZW5kcG9pbnRcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ3VzZXIgJyArIHVzZXIubmFtZSArICcgd2FzIHNhdmVkIGluIHRoZSBkYicpO1xuICAgIGNiICYmIGNiKDIwMCk7XG4gIH0pO1xufTtcbiJdfQ==
;