FROM node:8-alpine

RUN npm config set loglevel warn
ADD package.json /tmp/package.json
RUN cd /tmp && npm cache verify && npm install

# Home directory for document-service application
RUN mkdir /home/document-service
RUN mkdir /home/document-service/storage
WORKDIR /home/document-service

RUN cp -a /tmp/node_modules /home/document-service
ADD . /home/document-service


RUN addgroup document-service \
    && adduser -h /home/document-service -s /bin/sh -D -G document-service document-service \
    && mkdir /data \
    && chown -R document-service:document-service /data \
    && chown -R document-service:document-service /home/document-service

USER document-service