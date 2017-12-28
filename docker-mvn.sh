#!/bin/bash

tty_option=""
tty -s && tty_option="-t"

exec docker run -i ${tty_option} --rm \
  -v "$HOME/.m2:/root/.m2" \
  -v "$PWD":/usr/src/mymaven \
  -w /usr/src/mymaven \
  dukecon/dukecon-maven:latest \
  mvn "$@"
