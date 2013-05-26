# Website/Web Service template in Node.js

![puzzle](http://i.imgur.com/8orBBZu.png)

I wrote this template to help me create websites and Web Services with Node. It uses vanilla http server with a few small packages that most website need. Stuff like templates, router and serving static files. I borrowed a lot from the [npm website](https://github.com/isaacs/npm-www) that is written by isaacs.

### What's wrong with frameworks like express?

When newcomers ask about writing a website or a Web Service they are usualy being told to use express. The problem with express is it uses  middleware/Connect. middleware was a hack invented while solving a problem Node doesn't have. The problem that WSGI solves, which is creating a common interface for writing websites or frameworks that are used by web servers (such as Gunicorn in python or Thin in Ruby). Node doesn't even have those web servers since it comes with a built-in server as part of it's http library.  

middleware forces a pre-declared stack of (req,res,next) functions on top of your routes. It's mostly just not a very useful approach for handling the kinds of things you need a webserver to do - serving static files, parsing POST data, parsing cookies, routing, auth. All can be handled quite nicely just by explicitly passing req and res around as necessary or by returning a stream and piping that to res as the case may warrant.  

Also, writing a middleware means you create a module that doesn't work with the Node eco-system. It only works with express/Connect.

## Index

* [Design Philosophy](#design-philosophy)
* [Folders sturcture](#folders-structure)
* [Modules being used](#modules-being-used)
* [Run](#run)
* [Test](#test)
* [Deploy](#deploy)
* [Misc](#misc)

## Design Philosophy

(inspired by [isaacs](https://github.com/isaacs/npm-www))

* **No frameworks** - Everything is done using small, simple, standalone modules that work with vanilla Node.js http servers. Also no test frameworks or control flow library.
* **Unceremonious MVC** - No big MVC class heirarchy. Just have the route handler get some data, then hand it off to a template.  Simpler is better.
* **Ridiculous speed** - This site should be surprisingly fast.  Towards that end, things are cached and served from memory whenever possible, and ETagged for browser-cacheablility.
* **Small Modules** - No single JavaScript file should be more than about 200 lines.  If it is, then that's a sign that it should be split up.  
* **DRY Dependencies** - If multiple different routes all have to keep doing the same thing, then they should either be the same route, or the repeated bits belong in a dependency.
* **No lib folder** - If you would put it in `lib/`, then it belongs in a separate module.

## Folders structure

```
server.js               # the starting point of our server

router.js               # map urls to functions

routes/                 # each request will ended up in one of those
  index.js              # request for '/'
  static.js             # request for static files

db/                     # db related stuff 
  db.js                 # access to a real db (just a json file for this example)
  mock-db.js            # access to mocked db. used for unit tests
  contacts.json         # our DB

templates/              # UI stuff
  index.ejs             # homepage - showing list of users
  contact-partial.ejs   # each contact

config/                 # single entry point for dependencies:
  development.js        # hostnames, dbs, external api etc
  prod.js               
  test.js

test/             
  index.js              # unit tests with tape

bin/
  deploy               # deploy script
  restart              # post-deploy script

deploy.conf            # deployment config file
```

## Modules being used

* [routes](https://github.com/aaronblohowiak/routes.js) - routing
* [templar](https://github.com/isaacs/templar) - agnostic templating
* [ejs](https://github.com/visionmedia/ejs) - js templates
* [st](https://github.com/isaacs/st) - serving static files
* [error-page](https://github.com/isaacs/error-page) - send error pages
* [browserify](https://github.com/substack/node-browserify) - to use a node-style require() to organize your browser code
* [Grunt](http://gruntjs.com/) - watch and compile browserify and stylus
* [tape](https://github.com/substack/tape) - browser and server unit tests
        
### Alternative Modules

(Please add any helpful modules that works with vanilla http server)

* [jade](https://github.com/visionmedia/jade) instead of ejs
* [ecstatic](https://github.com/jesusabdullah/node-ecstatic) instead of st

## Run

```
sudo npm install browserify -g
sudo npm install grunt-cli -g
npm install
grunt watch                        # compile .styl files with stylus and .js files with browserify 
node server.js
```
http://localhost:3000

## Test

I use [tape](https://github.com/substack/tape), substack's minimalist test library. Server and client side code.  I wrote about it [here](https://github.com/oren/oren.github.com/blob/master/posts/tape/tape.md) if you havn't heard about it.

    npm test                      # use tape binary to run all tests

or

    node test/server/index.js      # run a single test

## Deploy

I use [deploy](https://github.com/visionmedia/deploy), a 400 lines bash script written by TJ Holowaychuk. [Here](https://github.com/oren/oren.github.com/blob/master/posts/deploy.md) is my quick blog post about it.

    bin/deploy qa         # deploy to qa host
    bin/deploy prod       # deploy to prod host

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
304 - not modified
400 - bad request  
401 - unauthorized  
404 - not found  
405 - method not allowed  
500 - server error  

#### Contributions welcome!

