var Browser = require("zombie");
var assert = require("assert");

// Load the page from localhost
browser = new Browser()

browser.visit("http://localhost:3000/", {debug: false}, function () {
  console.log(browser.text('title'));

  assert.equal(browser.text('title'), "Node.js Website Template");
});
