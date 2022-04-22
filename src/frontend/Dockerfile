FROM node:12.2.0-alpine

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --no-cache

COPY . /app

EXPOSE 3000

CMD ["npm", "start"]