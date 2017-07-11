FROM node:8-alpine

ADD package.json /tmp/package.json
RUN cd /tmp && npm cache verify && npm install

# Home directory for microgateway-service application
RUN mkdir /home/microgateway-service
RUN mkdir /home/microgateway-service/definitions
RUN mkdir /home/microgateway-service/server
RUN mkdir /home/microgateway-service/config
WORKDIR /home/microgateway-service

RUN cp -a /tmp/node_modules /home/microgateway-service
ADD definitions /home/microgateway-service/definitions
ADD server /home/microgateway-service/server
ADD config /home/microgateway-service/config
ADD env.yml /home/microgateway-service
ADD package.json /home/microgateway-service

RUN addgroup microgateway-service \
    && adduser -h /home/microgateway-service -s /bin/sh -D -G microgateway-service microgateway-service \
    && mkdir /data \
    && chown -R microgateway-service:microgateway-service /data \
    && chown -R microgateway-service:microgateway-service /home/microgateway-service

USER microgateway-service