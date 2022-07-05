# Our simple app

Here's a very basic little app

## Follow the white rabbit

Please look [there](doc/exercise.md) to see the previous content of markdown (with lint and spell corrections).

Please look [there](doc/candidate_approach.md) to see how I handled the exercise.

Please look [there](doc/API.md) to see how the API works.

## Requirements

Fulfill root package.json requirements for Node.JS and NPM versions. [NVM](https://github.com/nvm-sh/nvm) is your friend.

## Install deps

Install dependencies from root level of monorepo using the following command:

```bash
npm install
```

It will also install some githooks.

## Run

From root level of monorepo

```bash
npm start -w backend
```

From backend workspace

```bash
npm start
```

## Test

From root level of monorepo

```bash
npm test:unit -w backend
```

From backend workspace

```bash
npm test:unit
```
