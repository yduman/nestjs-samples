# NestJS Samples

This repo contains source code for several use cases utilizing the [NestJS](https://nestjs.com/) framework. You can read more about it in their [docs](https://docs.nestjs.com/). Heavily inspired by [NestJS Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero). 

## Projects

### rest-api

- Example project for defining a REST-API interacting with Postgres using [TypeORM](https://typeorm.io/).

#### Setup Postgres

- ```console
  $ cd rest-api/infrastructure && docker-compose up -d 
  ```
- Install [pgAdmin](https://www.pgadmin.org/download/) in order to interact with Postgres.

### gql-mongo

- Example project for interacting with GraphQL and MongoDB

#### Setup Mongo

- ```console
  $ docker run --name mongo -p 27017:27017 -d mongo
  ```
- Install [Robo3T](https://robomongo.org/download) in order to interact with MongoDB.

### websockets

- Example project to demonstrate communication via websockets using [socket.io](https://socket.io/) under the hood
