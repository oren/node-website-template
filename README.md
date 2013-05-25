Website template in Node.js

## Design Philosophy:

(inspired by [isaacs](https://github.com/isaacs/npm-www))

* **No frameworks** - Everything is done using small, simple, standalone modules that work with vanilla Node.js http servers. Also no test frameworks or control flow library.
* **Unceremonious MVC** - No big MVC class heirarchy. Just have the route handler get some data, then hand it off to a template.  Simpler is better.
* **Ridiculous speed** - This site should be surprisingly fast.  Towards that end, things are cached and served from memory whenever possible, and ETagged for browser-cacheablility.
* **Small Modules** - No single JavaScript file should be more than about 200 lines.  If it is, then that's a sign that it should be split up.  
* **DRY Dependencies** - If multiple different routes all have to keep doing the same thing, then they should either be the same route, or the repeated bits belong in a dependency.
* **No lib folder** - If you would put it in `lib/`, then it belongs in a separate module.

## But can't we use express?

express is a great framework but you usually need is to route urls to functions and if you are building a website and not just an API you can simply add a templating engine. Everything you need can be done by adding a simple node module that can easily be replaced or removed if needed.

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
      home.js             # unit tests with tape

## Modules being used

        routes - routing
        templar - agnostic templating
        ejs - js templates
        error-page - send error pages
        tape - unit tests
        
## Run

    npm install
    node server.js
    http://localhost:3000

## Test

    npm test               # use tape binary to run all tests

or

    node test/home.js      # run a single test

#### Contributions welcome!  
