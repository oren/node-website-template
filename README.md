Website template in Node.js

## Design Philosophy:

(inspired by [isaacs](https://github.com/isaacs/npm-www))

* No frameworks - Everything is done using small, simple, standalone modules that work with vanilla Node.js http servers.

* No lib folder - If you would put it in `lib/`, then it belongs in a separate module.

* JavaScript, EJS, and Stylus -   
We are using JavaScript because that is the language Node.js runs.  
    We are using EJS for templating, because that is the template language that is closest to HTML.  
    We are using Stylus for styling, because CSS is intolerable, and stylus is a reasonable superset that adds useful features in a way that makes it very clear what the resulting CSS will be.

* Ridiculous speed - This site should be surprisingly fast.  Towards that end, things are cached and served from memory whenever possible, and ETagged for browser-cacheablility
* Unceremonious MVC - No big MVC class heirarchy. Just have the route handler get some data, then hand it off to a template.  Simpler is better.

* Small Modules - No single JavaScript file should be more than about 200 lines.  If it is, then that's a sign that it should be split up.

* DRY Dependencies - If multiple different routes all have to keep doing the same thing, then they should either be the same route, or the repeated bits belong in a dependency.

## WHY U NO USE EXPRESS?

express is a great framework but what most people need is to route urls to some functions and if it's not just an API but a complete website you would also need a templating engine. We get routes and template by using simple node modules that can easily be replaced or completely removed if needed.

There are two drawback for using expresss. The first is connect/middleware - every middleware you add is being added to each request to your server even if not all the requests needs it. The second drawback is it doesn't play nice with stream - one of the core aspects of Node.  

## Folders Structure

    server.js             # the starting point of our server

    routes/               # each request will ended up in one of those
      home.js             # request for '/'
      static.js           # request for static files

    models/               # getting and saving stuff in our DB 
      all-contacts.js     # getting all contacts
      contacts.json       #  our DB - a few contacts

    templates/            # UI stuff
      home.ejs            # homepage - showing list of users
      contact-partial.ejs # each contact

    test/             
      end2end                 # full stack, end-to-end tests
        home.js

## modules being used

        templar - agnostic templating
        ejs - js templates
        error-page - send error pages
        mapleTree - routing
        tape - unit tests
        zombie.js - end2end tests
        
## Run

    node server.js
    http://localhost:3000

## Contributing

Contributions welcome!  
