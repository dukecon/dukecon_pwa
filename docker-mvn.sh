#!/bin/bash

set -eu

tty_option=""
tty -s && tty_option="-t"

: ${USER:="dukecon"}
: ${USER_HOME:="/home"}
: ${MAVEN_CMD:="mvn"}
: ${MAVEN_OPTS:=""}

# Setting of Java user.home property is necessary when using '-u' on Docker call since the Docker container
# cannot determine a valid Home for this use. Then Maven uses '?' as the user home, settings.xml etc. cannot be
# found and this results in subsequent problems.

mkdir -p ${PWD}/.docker/{home,logs,node,node_modules,npm,tmp}

exec docker run -i ${tty_option} --rm \
  -v "${PWD}:/usr/src" \
  -w /usr/src \
  \
  -u "$(id -u)" \
  -e "MAVEN_OPTS=-Duser.home=${USER_HOME} -Duser.name=${USER} ${MAVEN_OPTS}" \
  \
  -v "${HOME}/.m2:${USER_HOME}/.m2" \
  -e "HOME=${USER_HOME}" \
  -e "USER_HOME_DIR=${USER_HOME}" \
  -e "MAVEN_CONFIG=${USER_HOME}/.m2" \
  -e "USER=${USER}" \
  \
  -v "${PWD}/.docker/home:${USER_HOME}" \
  -v "${PWD}/.docker/logs:/usr/src/logs" \
  -v "${PWD}/.docker/npm:${USER_HOME}/.npm" \
  -v "${PWD}/.docker/node:/usr/src/node" \
  -v "${PWD}/.docker/node_modules:/usr/src/node_modules" \
  -v "${PWD}/.docker/tmp:/tmp" \
  \
  dukecon/dukecon-maven:3.6.3-adoptopenjdk-14 \
  /bin/sh -c "/usr/bin/xvfb-run -s \"-screen 0 2560x1440x8\" -a -e logs/xvfb.err -- ${MAVEN_CMD} ${*:-}"
