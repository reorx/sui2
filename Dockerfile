FROM node:16-buster-slim

# install dev dependencies for sui2/live-server
WORKDIR /live-server
ADD live-server/package.json ./
RUN npm i --dev

# build sui2/live-server frontend
ADD live-server ./
RUN npm run build

FROM node:16-buster-slim

ENV TINI_VERSION v0.19.0
# requires using buildx
ARG TARGETARCH
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini-${TARGETARCH} /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

# install dependencies for sui2
WORKDIR /app
ADD package.json ./
RUN npm i

# install prod dependencies for sui2/live-server
WORKDIR /app/live-server
ADD live-server/package.json ./
RUN npm i --omit=dev

# add all files
ADD . /app

# copy editor dist from the last image
COPY --from=0 /live-server/editor/dist ./editor/dist

ENV DATA_DIR /data
CMD ["node", "app.js"]
