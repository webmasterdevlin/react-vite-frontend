# React + TypeScript + Vite

This project was bootstrapped with [Vite](https://vitejs.dev/).

## Available Scripts

- `bun dev` - Start the development server
- `bun build` - Build the project for production
- `bun serve` - Preview the production build
- `bun test` - Run the test suite

## Docker

Login to Docker Hub

```zsh
$ docker login
```

create a React container

```zsh
$ docker build -t webmasterdevlin/react-vite:1.0.0 .
```

Test the React container by running it. It should be visible at localhost:8080

```zsh
$ docker run -p 8080:80 webmasterdevlin/react-vite:1.0.0
```

Push the container to your Docker Hub account repository

```zsh
$ docker push webmasterdevlin/react-vite:1.0.0
```
