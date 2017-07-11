FROM node:8-alpine

RUN npm config set loglevel debug
ADD package.json /tmp/package.json
RUN cd /tmp && npm cache verify && npm install

# Home directory for user-service application
RUN mkdir /home/user-service
WORKDIR /home/user-service

RUN cp -a /tmp/node_modules /home/user-service
ADD . /home/user-service

RUN addgroup user-service \
    && adduser -h /home/user-service -s /bin/sh -D -G user-service user-service \
    && mkdir /data \
    && chown -R user-service:user-service /data \
    && chown -R user-service:user-service /home/user-service

USER user-service