#!/bin/bash


# u error if var not set
# e stop if a line return an error
# x verbose - prints every line
set -xue
cd /home/oren/projects/node-website-template
git stash
git checkout develop
git pull
./bin/restart
