FROM node:19-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache -u curl g++ automake autoconf nasm gcc gifsicle zlib git unzip make python3

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:19-alpine as production

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache -u curl g++ automake autoconf nasm gcc gifsicle zlib git unzip make python3

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]