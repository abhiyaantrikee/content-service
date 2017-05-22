# Node v7 as the base image to support ES6
FROM node:7.2.0

MAINTAINER Ashutosh Ranjan "ashutoshranjan.33@gmail.com"

# Create a new user to our new container and avoid the root user
RUN useradd --user-group --create-home --shell /bin/false nupp && \
    apt-get clean
ENV HOME=/home/nupp
COPY . $HOME/app/
RUN chown -R nupp:nupp $HOME/* /usr/local/
WORKDIR $HOME/app
RUN npm cache clean && \
    npm install --silent --progress=false --development

RUN chown -R nupp:nupp $HOME/*
USER nupp

EXPOSE 9000

CMD ["npm", "start"]