
FROM node:16-alpine
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY . .

RUN yarn install
RUN yarn turbo run build

WORKDIR /app/site
ENV NODE_ENV production

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT yarn next start