Website template in Node.js

## Design Philosophy:

(inspired by [isaacs](https://github.com/isaacs/npm-www))

* No frameworks

    Everything is done using small, simple, standalone modules that work
    with vanilla Node.js http servers.

* No lib folder

    If you would put it in `lib/`, then it belongs in a separate module.

* JavaScript, EJS, and Stylus

    We are using JavaScript because that is the language Node.js runs.

    We are using EJS for templating, because that is the template
    language that is closest to HTML.

    We are using Stylus for styling, because CSS is intolerable, and
    stylus is a reasonable superset that adds useful features in a way
    that makes it very clear what the resulting CSS will be.

* Ridiculous speed

    This site should be surprisingly fast.  Towards that end, things are
    cached and served from memory whenever possible, and ETagged for
    browser-cacheablility.

* Unceremonious MVC

    No big MVC class heirarchy.  Just have the route handler get some
    data, then hand it off to a template.  Simpler is better.

* Small Modules

    No single JavaScript file should be more than about 200 lines.  If
    it is, then that's a sign that it should be split up.

* DRY Dependencies

    If multiple different routes all have to keep doing the same thing,
    then they should either be the same route, or the repeated bits
    belong in a dependency.

* Check in node_modules

    Every time you add a dependency, check it into git.  This is a
    deployed website.  We need to keep things predictable.


## run

    node server.js
    http://localhost:3000

## Contributing

Contributions welcome!  
