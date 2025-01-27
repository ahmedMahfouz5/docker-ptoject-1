FROM node:current-alpine3.21 as base

FROM base as development
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@11.0.0
RUN npm install --omit=dev
RUN npm install --save-dev nodemon
COPY . .
EXPOSE 3000
CMD [ "npm","run","start-dev" ]

FROM base as production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=prod
COPY . .
EXPOSE 3000
CMD [ "npm","start" ]