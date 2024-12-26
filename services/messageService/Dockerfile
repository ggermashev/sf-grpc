FROM node:18

RUN mkdir -p ./messageService
WORKDIR ./messageService

COPY package.json package.json
RUN npm install

COPY ./src ./src

CMD npm run dev