#!/bin/bash

set -eu

tty_option=""
tty -s && tty_option="-t"

: ${USER_HOME:="/tmp"}
: ${MAVEN_CMD:="mvn -Pheadless"}

mkdir -p $PWD/.docker/{tmp,node,node_modules,npm}

exec docker run -i ${tty_option} --rm \
  -v "$HOME/.m2:$USER_HOME/.m2" \
  -v "$PWD/.docker/npm:$USER_HOME/.npm" \
  -v "$PWD":/usr/src \
  -v "$PWD/.docker/node:/usr/src/node" \
  -v "$PWD/.docker/node_modules:/usr/src/node_modules" \
  -u $(id -u) \
  -w /usr/src \
  -e HOME=$USER_HOME \
  -e MAVEN_CONFIG=$USER_HOME/.m2 \
  dukecon/dukecon-maven:3.6.3-adoptopenjdk-14 \
  /bin/sh -c "/usr/bin/xvfb-run -s \"-screen 0 2560x1440x8\" -a -e /tmp/xvfb.err -- ${MAVEN_CMD} ${*}"
