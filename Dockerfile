#this is the node version
FROM node:22.14.0

#The home directory
WORKDIR /app

RUN yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]