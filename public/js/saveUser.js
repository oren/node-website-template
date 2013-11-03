module.exports = function (user, cb) {
  // save user in our DB. in the real scenario this will be an async call to an http endpoint
  setTimeout(function () {
    console.log('user ' + user.name + ' was saved in the db');
    cb && cb(200);
  });
};
