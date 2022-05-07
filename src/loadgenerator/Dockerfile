FROM node:14.7.0

# install K6
WORKDIR /tmp
ADD https://github.com/grafana/k6/releases/download/v0.38.1/k6-v0.38.1-linux-amd64.tar.gz /tmp/k6-v0.38.1-linux-amd64.tar.gz
RUN tar -xzf k6-v0.38.1-linux-amd64.tar.gz
RUN mv k6-v0.38.1-linux-amd64/k6 /usr/bin/k6

WORKDIR /app

COPY . .

RUN npm install

CMD node generate_load.js

EXPOSE 80