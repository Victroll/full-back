FROM node:10.16.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/package.json
RUN npm install
COPY . /usr/src/app
EXPOSE 3214
CMD ["node", "server.js"]