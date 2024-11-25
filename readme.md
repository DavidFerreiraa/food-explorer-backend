# Food Explorer API

Food explorer API by DavidFerreiraa -> docs

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](https://food-explorer-backend-rhxz.onrender.com/docs)
- [Authentication](#authentication)

## Features
- (e.g., CRUD operations for resources)
- (e.g., User authentication with JWT)
- (e.g., File upload and storage)
- (e.g, Server using fastify)
- (e.g, Typescript usage)
- (e.g, Prisma ORM usage)
- (e.g, Swagger to API docs with open API 2.0)
- (e.g, Swagger ui - can be accessed into [/docs](https://food-explorer-backend-rhxz.onrender.com/docs) into production [/docs](http://localhost:3333/docs) on your localhost)
- (e.g, Docker containerization usage)

## Getting Started
- Download [Docker](https://www.docker.com)
- And don't worry, docker-compose will handle with all that to you! Even the prerequisites above.

### Prerequisites
- Node.js (version [`18-alphine`](https://github.com/nodejs/docker-node/blob/e3a1285ed07039b9f6552ccec49a469a052fd0c6/18/alpine3.20/Dockerfile))
- Database (PostgreSQL)

### Installation
1. Clone this repository:
    ```bash
    git clone https://github.com/DavidFerreiraa/food-explorer-backend.git
    cd food-explorer-backend
2. Simply execute on your bash a:
    ```bash
    docker-compose up -d --build
    ```
    Now you API is running into "http://localhost:3333"
3. If you want to use prisma, remember to set its relative path to schema that's --schema=./api/src/prisma/schema.prisma. Usage:
    ```bash
    npx prisma <command_that_you_need> --schema=./api/src/prisma/schema.prisma
    ````
    You can do this, but into the scripts i left some ready commands that you can run into a ```npm run```, search for then into ```package.json```.
4. At first you will need to create some plates, but at first you will need to create a Category for it. You can create a Category by running the following command ```npm run prisma-category```. Or you can just run a ```npm run prisma-studio```and create it manually.

## Usage
- Just check the [API Documentation](https://food-explorer-backend-rhxz.onrender.com/docs) for it.

## Authentication
- The Authentication is madded using server Cookies (token, refreshToken), they are both JWT Token, so be sure to have then into the headers to make a request.