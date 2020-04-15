# NestJS Samples

This repo contains source code for several use cases utilizing the [NestJS](https://nestjs.com/) framework. You can read more about it in their [docs](https://docs.nestjs.com/). Heavily inspired by [NestJS Zero to Hero](https://www.udemy.com/course/nestjs-zero-to-hero). 

## Projects

### rest-api

- Example project for defining a REST-API interacting with Postgres using [TypeORM](https://typeorm.io/).
- Install [pgAdmin](https://www.pgadmin.org/download/) in order to interact with Postgres.
- ```console
  $ # Create Postgres container and start application
  $ cd rest-api/infrastructure && docker-compose up -d && cd .. && yarn && yarn start:dev 
  ```

### gql-mongo

- Example project for interacting with [GraphQL](https://graphql.org/) and [MongoDB](https://www.mongodb.com/)
- Install [Robo3T](https://robomongo.org/download) in order to interact with MongoDB.
- ```console
  $ # Create MongoDB container and start application
  $ docker run --name mongo -p 27018:27017 -d mongo
  $ cd gql-mongo && yarn && yarn start:dev
  ```

### websockets

- Example chat app using NestJS and React to demonstrate communication via websockets utilizing [socket.io](https://socket.io/) under the hood
- ```console
  $ # Start backend on port 3001 and frontend on port 3000
  $ cd websockets/backend && yarn && yarn start:dev
  $ cd websockets/frontend && yarn && yarn start
  ```
