# Bot template

Start a Bot with NestJS, Hasura and Postgres

## Setup

```sh
cp bot/.env.local.example bot/.local.env
# Edit bot/.local.env with your local/dev discord token

cp bot/.development.env.example bot/.development.env
# Edit bot/.development.env with your dev discord token

cp bot/.env.example bot/.env
# Edit bot/.env with your prod discord token
```

## Profiles

### Normal

- Start Hasura, Postrgres and bot in docker
- No Hot reload

```
docker-compose up -d
```


### Dev

- Start Hasura, Postrgres and the bot in docker
- Code mounted to bot container
- Hot reload (slow on MacOS)

```
docker-compose up -f docker-compose.dev.yml -d
```

### Local

- Start Hasura and Postrgres in docker
- Bot run locally
- Hot reload (fast on MacOS)

```
docker-compose up -f docker-compose.local.yml -d
cd bot
yarn start
```
