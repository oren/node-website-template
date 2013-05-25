#!/bin/bash

# script for restarting the server. usualy after deploy

APP=/var/www/node-website-template

cd $APP/current
npm install

forever stopall
rm -r $APP/shared/logs/forever.log
forever start --pidFile $APP/shared/pids/server.pid -l $APP/shared/logs/forever.log -o $APP/shared/logs/server.log -e $APP/shared/logs/server.err $APP/current/server.js

