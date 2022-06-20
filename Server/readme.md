# Disclaimer

- everything is set for windows so if we would want to deploy this to some server (which runs Linux), we might have to change some things (maybe paths, the pnpm clean command and maybe some more)

# Commands

- first thing needed is to install everything properpy (see below)

## "pnpm start"

- opens dev server. not for production

## "pnpm build"

- builds the project for production everytime

# How to set everything up

- first open powershell in admin mode and paste this. which enables running scripts from vscode: "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser"

## PNPM

- download and install node.js from https://nodejs.org/en/
- then in terminal (you can do this from Visual Studio terminal) install pnpm: "npm install -g pnpm"
- for update pnpm: "pnpm add -g pnpm"
- installing all dependencies and modules: "pnpm install"

## Express

- Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- install: "pnpm add express"

## Mongodb

- Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- install: "pnpm add mongodb"

## CORS

- CORS is a node.js package for providing a consistent interface for working with cross-origin resource sharing.
- install: "pnpm add cors @types/cors"

## DOTENV

- Dotenv is a Node.js module for loading environment variables from a .env file into process.env.
- install: "pnpm add dotenv"

## NODEMON

- TS-Node is a Node.js package for using TypeScript with Node.js.
- install: "pnpm add -D ts-node nodemon"

## TypeScript

- TypeScript is a superset of JavaScript that compiles to plain JavaScript.
- install: "pnpm add -D typescript @types/express @types/node"
