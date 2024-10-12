FROM node:latest


WORKDIR /app 

COPY . .

RUN rm -rf node_modules

RUN yarn install 

RUN  yarn migration

EXPOSE 5002

CMD ["yarn", "start"]

