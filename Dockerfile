FROM node:16-buster

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# install dependencies for sui2
WORKDIR /app
ADD package.json ./
RUN npm i

# install dependencies for sui2/live-server
WORKDIR /app/live-server
ADD live-server/package.json ./
RUN npm i

# add all files
WORKDIR /app
ADD . .

# build sui2/live-server frontend
WORKDIR /app/live-server
RUN npm run build

ENV DATA_DIR /data
CMD ["node", "app.js"]
