'use strict';

module.exports = home;

// getting our contacts from the 'database' - contacts.json

function home (req, res, config) {
  config.db.allContacts(function (er, data) {
    if (er) return res.error(er);

    data = Object.keys(data).map(function (id) {
      return data[id];
    });

    res.template('index.ejs', { title: 'Node.js Website Template', contacts: data });
  });
};
