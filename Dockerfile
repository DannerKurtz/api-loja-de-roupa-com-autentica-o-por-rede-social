FROM node:20

WORKDIR /app

COPY .env .env

COPY . .

RUN yarn install

# Adicionando a variável de ambiente
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN printenv

RUN echo "Running migrations..."
RUN yarn migration

EXPOSE 5002
CMD ["yarn", "start"]
