FROM node:18

RUN mkdir -p ./userService
WORKDIR ./userService

COPY package.json package.json
RUN npm install

COPY ./src ./src

CMD npm run dev