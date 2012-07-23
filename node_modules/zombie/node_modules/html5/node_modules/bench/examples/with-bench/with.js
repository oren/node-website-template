var outside = "outside";
// (function (foo) {
with ({foo:"bar"}) {
  exports.test = function testWith () {
    (function (wrapperArg) {
      // set a global
      bar = process.version;
      // set the local
      foo = process.argv;
      // read the local
      var f = foo;
      // read the wrapper arg.
      var asdf = wrapperArg;
      // read a global
      var p = process;
      // read the var from outside this wrapper
      var o = outside;
      // set the outside var from inside the wrapper
      outside = foo;
    })("asdf");
  };
// })("bar");
}
