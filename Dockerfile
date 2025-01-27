FROM node:current-alpine3.21 as base

FROM base as development
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install --save-dev nodemon
COPY . .
EXPOSE 3000
CMD [ "npm","run","start-dev" ]

FROM base as production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD [ "npm","start" ]