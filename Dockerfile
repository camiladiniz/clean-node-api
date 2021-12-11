FROM node:14.8
WORKDIR /usr/src/clean-node-api
COPY ./package.json .
RUN npm install --only=prod