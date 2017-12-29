#!/bin/bash

set -eu

set -o pipefail

tty_option=""
tty -s && tty_option="-t"

: ${USER_HOME:="/root"}

exec docker run -i ${tty_option} --rm \
  -v "$HOME/.m2:$USER_HOME/.m2" \
  -v "$PWD/.npm:$USER_HOME/.npm" \
  -v "$PWD":/usr/src \
  -w /usr/src \
  -e MAVEN_CONFIG=$USER_HOME/.m2 \
  dukecon/dukecon-maven:latest \
  /bin/sh -c "/usr/bin/xvfb-run -s \"-screen 0 2560x1440x8\" -a -e xvfb.err -- mvn $*"
