FROM dukecon/dukecon-httpd-base:latest
MAINTAINER Gerd Aschemann <gerd@aschemann.net>

COPY dist/. /usr/local/apache2/htdocs
ADD dispatcher.conf /usr/local/apache2/sites.d/dispatcher.conf
