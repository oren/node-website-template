module.exports = home;

var allContacts = require("../models/all-contacts.js")

function home (req, res) {
  allContacts(function (er, data) {
    if (er) return res.error(er);

    data = Object.keys(data).map(function (id) {
      return data[id];
    }).sort(function (a, b) {
      return a.date > b.date ? -1 : 1;
    })

    res.template('home.ejs', { title: 'Node.js Website Template', contacts: data });
  });
};
