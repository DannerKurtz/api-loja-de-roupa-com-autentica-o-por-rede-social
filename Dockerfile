FROM node:20

WORKDIR /app

COPY . .

RUN yarn install

RUN find . -mindepth 1 ! -name 'build' ! -name 'package.json' ! -name 'Dockerfile' ! -name '.github' -exec rm -rf {} +

RUN yarn installProduction

# Adicionando a variável de ambiente
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN printenv

RUN echo "Running migrations..."
RUN yarn migration

EXPOSE 5002
CMD ["yarn", "start"]
