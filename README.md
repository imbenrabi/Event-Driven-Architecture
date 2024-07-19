# Event-Driven Architecture with Fastify, tRPC, and Kafka

This project implements a event-driven flow where events/messages are sent from a client to a Kafka queue via a tRPC server, and subsequently to an end provider/service. The project is organized in a monorepo and includes repository management tools such as lint, Husky, and Commitlint.

# Notable Technologies

- [**Bun**](https://bun.sh/)
- [**Docker**](https://www.docker.com/get-started)
- [**KafkaJS**](https://kafka.js.org/)
- [**Kafdrop**](https://github.com/obsidiandynamics/kafdrop)
- [**tRPC**](https://trpc.io/)
- [**Fastify**](https://www.fastify.io/)
- [**Zod**](https://zod.dev/)
- [**pino**](https://github.com/pinojs/pino)
- [**Mocha**](https://mochajs.org/)
- [**Chai**](https://www.chaijs.com/)
- [**NYC**](https://github.com/istanbuljs/nyc)
- [**Sinon**](https://sinonjs.org/)
- [**Commitlint**](https://commitlint.js.org/)
- [**Husky**](https://typicode.github.io/husky/#/)
- [**Lint-staged**](https://github.com/okonet/lint-staged)

# Setting Up Kafka Using Docker

We'll use Docker to simplify the installation process.

## Prerequisites

1. **Docker**: Ensure Docker is installed on your machine. You can download it from [here](https://www.docker.com/get-started).
2. **Bun**: Ensure Bun is installed on your machine. You can download it from [here](https://bun.sh/install).
   - you can also use npm/yarn with Node.js but Bun is fun.

## Steps to Set Up Kafka locally

### 1. Run Zookeper and Kafka with Docker

In root, run:

```sh
docker-compose up -d
```

# Running the project

### 1. Install Deps

Install project deps.
Go to root and run:

```sh
bun install
```

### 2. Run Kafka

Make sure Docker image is running succesfully.
Go to root and run:

```sh
bun run dev:kafka
```

The script will start a Kafka consumer that is using batching.
you can disable batching by setting `KAFKA_MESSAGE_BATCHING` env variable to `false`.

### 3. Run Server

Go to root and run:

```sh
bun run dev:server
```

### 4. Run client

Make sure server is running succesfully.
Go to root and run:

```sh
bun run dev:client
```

Go to [localhost](http://localhost:5173/).

# Checking results

### Go to Kafdrop - a Kafka UI Client

The Docker compose command installed and ran [Kafdrop](https://github.com/obsidiandynamics/kafdrop) image as well.
Go to [localhost:19000](http://localhost:19000) to review results.

# Tests

We are using [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/) for testing, alongside [nyc](https://github.com/istanbuljs/nyc) for HTML report.

## Running tests

From a specific package root, run:

```sh
bun run test
```

OR
From root, run:

```sh
bun run test:all
```

- You can also run per package - see package.json scripts.

## Running tests with coverage and opening the HTML report

From a specific package root, run:

```sh
bun run test:coverage:open
```

OR
from root, run:

```sh
bun run test:coverage:open:<packageName>
```

For specific package.

OR

```sh
bun run test:coverage:open:all
```

For all packages.
