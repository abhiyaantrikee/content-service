FROM node:6-alpine

ADD package.json /tmp/package.json
RUN cd /tmp && npm cache clean && npm install

# Home directory for gateway-service application
RUN mkdir /home/gateway-service
RUN mkdir /home/gateway-service/definitions
RUN mkdir /home/gateway-service/server
WORKDIR /home/gateway-service

RUN cp -a /tmp/node_modules /home/gateway-service
ADD definitions /home/gateway-service/definitions
ADD server /home/gateway-service/server
ADD env.yml /home/gateway-service
ADD package.json /home/gateway-service

RUN addgroup gateway-service \
    && adduser -h /home/gateway-service -s /bin/sh -D -G gateway-service gateway-service \
    && mkdir /data \
    && chown -R gateway-service:gateway-service /data \
    && chown -R gateway-service:gateway-service /home/gateway-service

USER gateway-service