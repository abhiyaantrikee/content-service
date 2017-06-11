FROM node:6-alpine

MAINTAINER Ashutosh Ranjan "ashutoshranjan.33@gmail.com"

RUN npm config set loglevel warn
ADD package.json /tmp/package.json
RUN cd /tmp && npm cache clean && npm install

# Home directory for content-service application
RUN mkdir /home/content-service
WORKDIR /home/content-service

RUN cp -a /tmp/node_modules /home/content-service
ADD . /home/content-service


RUN addgroup content-service \
    && adduser -h /home/content-service -s /bin/sh -D -G content-service content-service \
    && mkdir /data \
    && chown -R content-service:content-service /data \
    && chown -R content-service:content-service /home/content-service

USER content-service