# Website template in Node.js

## Index

* [Design Philosophy](#design-philosophy)
* [Why can't you use express?](#why-can't-you-use-express?)
* [Folders sturcture](#folders-structure)
* [Modules being used](#modules-being-used)
* [Run](#run)
* [Test](#test)
* [Misc](#misc)

## Design Philosophy:

(inspired by [isaacs](https://github.com/isaacs/npm-www))

* **No frameworks** - Everything is done using small, simple, standalone modules that work with vanilla Node.js http servers. Also no test frameworks or control flow library.
* **Unceremonious MVC** - No big MVC class heirarchy. Just have the route handler get some data, then hand it off to a template.  Simpler is better.
* **Ridiculous speed** - This site should be surprisingly fast.  Towards that end, things are cached and served from memory whenever possible, and ETagged for browser-cacheablility.
* **Small Modules** - No single JavaScript file should be more than about 200 lines.  If it is, then that's a sign that it should be split up.  
* **DRY Dependencies** - If multiple different routes all have to keep doing the same thing, then they should either be the same route, or the repeated bits belong in a dependency.
* **No lib folder** - If you would put it in `lib/`, then it belongs in a separate module.

## Why can't you use express?

express is a great framework but you usually need is to route urls to functions and if you are building a website and not just an API you can simply add a templating engine. Everything you need can be done by adding a simple node module that can easily be replaced or removed if needed.

There are two drawback for using expresss. The first is connect/middleware - every middleware you add is being added to each request to your server even if not all the requests needs it. The second drawback is it doesn't play nice with stream - one of the core aspects of Node.  

## Folders structure

    server.js              # the starting point of our server

    routes/                # each request will ended up in one of those
      home.js              # request for '/'
      static.js            # request for static files

    models/                # getting and saving stuff in our DB 
      all-contacts.js      # getting all contacts
      contacts.json        #  our DB - a few contacts

    templates/             # UI stuff
      home.ejs             # homepage - showing list of users
      contact-partial.ejs  # each contact
 
    config/                # single entry point for dependencies:
      development.js       # hostnames, dbs, external api etc
      prod.js               
 			test.js
      
    test/             
      home.js              # unit tests with tape

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

I use [tape](https://github.com/substack/tape), substack's minimalist test library. Server and client side code. 

    npm test               # use tape binary to run all tests

or

    node test/home.js      # run a single test

## Misc

### Code Guidelines

* Node Style Guide - http://nodeguide.com/style.html
* `'use strict';` at the top of every js file
* The server should be able to run as a command line app. server = require('./server.js')
* Single entry point for dependencies (easy to mock when testing)

### Status Codes

200 - ok  
201 - created  
202 - accepted  
400 - bad request  
401 - unauthorized  
404 - not found  
405 - method not allowed  
500 - server error  

#### Contributions welcome!
