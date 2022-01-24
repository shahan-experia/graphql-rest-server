# graphql-rest-server

## Installation

```sh
# Clone (or fork) the repo
git clone https://github.com/shahanahmed86/graphql-rest-server.git && cd graphql-rest-server
# Fill out .env file with secrets (development only)
cp .env.example .env
# Install the deps
npm install
# dockerize your system then Run this command
npm run up
# run the server
npm run dev
```

## mysql

```sh
# docker to open bash
docker exec -it khabri-main_mysql_db_1 bash

# docker to open mysql
docker exec -it khabri-main_mysql_db_1 mysql -u root -p prisma

# flags
-it # for interactive
-u # for username
-p # database
```

## redis commands

```sh
docker exec -it graphql-rest-server_cache_1 redis-cli -a secret
# flags
-it # for interactive
redis-cli # to load redis command line interface
-a # cli password
# redis commands
scan 0
get "adminToken"
ttl "adminToken"
del "adminToken"
```