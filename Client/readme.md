# Disclaimer

- everything is set for windows so if we would want to deploy this to some server (which runs Linux), we might have to change some things (maybe paths, the pnpm clean command and maybe some more)

# Commands

- first thing needed is to install everything properpy (see below)

## "pnpm start"

- opens live dev server. not for production

## "pnpm build"

- builds the project for production everytime

## "pnpm build:dev"

- for when you need to debug dev build output files in dev folder

## "pnpm clean"

- should not be needed as clean-webpack-plugin should delete the files when compiling
- removes public folder

<br/><br/>

# How to set everything up

- first open powershell in admin mode and paste this. which enables running scripts from vscode: "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser"

## PNPM

- download and install node.js from https://nodejs.org/en/
- then in terminal (you can do this from Visual Studio terminal) install pnpm: "npm install -g pnpm"
- for update pnpm: "pnpm add -g pnpm"
- installing all dependencies and modules: "pnpm install"

## Webpack (if "pnpm install" was successful the plugins below are already installed)

- instalation in terminal: "pnpm add -D webpack webpack-cli"

### react

- install: "pnpm add react react-dom"

#### react-router-dom

- for routing website. it acts as links throughout website
- install: "pnpm add react-router-dom"

### css-loader

- install: "pnpm add -D css-loader"

### style-loader

- injects css as inline style to js file. used only in development
- install: "pnpm add -D style-loader"

### Sass-loader

- install: "pnpm add -D sass sass-loader"

### Typescript

- install: "pnpm add -D typescript @types/react @types/react-dom ts-loader"

### Babel

- install: "pnpm add -D @babel/core @babel/preset-env @babel/preset-react
  @babel/preset-typescript babel-loader"

### mini-css-extract-plugin

- plugin for exporting css to a file
- install: "pnpm add -D mini-css-extract-plugin"

### css-minimizer-webpack-plugin

- minifies css
- install: "pnpm add -D css-minimizer-webpack-plugin"

### webpack-dev-server

- server for devs
- install: "pnpm add -D webpack-dev-server"

### html-webpack-plugin

- simplifies and minifies creation of HTML files to serve webpack bundles. handles linking hashes.
- install: "pnpm add -D html-webpack-plugin"

### html-loader

- exports HTML as string. HTML is minimized when the compiler demands.
- install: "pnpm add -D html-loader"

### ImageMinimizerWebpackPlugin

- optimizes images
- install: "pnpm add -D image-minimizer-webpack-plugin imagemin"
- support plugins install: "pnpm add -D imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo"

### webpack-merge

- merges (webpack config) files together
- install: "pnpm add -D webpack-merge"

### clean-webpack-plugin

- deletes old hashed files from public after compilation.
- install: "pnpm add -D clean-webpack-plugin"

### PostCss

- postcss loads and manages postcss plugins
- postcss-preset-env generates prefixes, polyfills
- install: "pnpm add -D postcss postcss-loader postcss-preset-env"

#### tailwind

- css utility classes when writing html
- install: "pnpm add -D tailwindcss"

#### PurgeCSS

- deletes unused css classes
- install: "pnpm add -D @fullhuman/postcss-purgecss"

<br/><br/>

# Folders & Files

## public

- its the version in production available to public

## node_modules

- do not touch it. its for all the dependencies

## src

- the source code

## .browserslistrc (can be deleted)

- support for specific versions of browsers used by postcss when generating prefixes

## .gitignore

- files to ignore when uploading to git. usually these files are generated

## .prettierignore (can be deleted)

- is list of files that the prettier should ignore

## .prettierrc

- is config for prettier which is autoformatter extension for vs code. The config makes sure that if someone working on this project uses prettier that we will have the same style of formatting

## package.json

- config for pnpm. scripts can be added.

## pnpm-lock.yaml

- do not touch. it does something important i guess.

## postcss.config.js

- config for postcss. used for loading additional plugins

## tailwind.config.js

- config for tailwind.

## tsconfig.json

- config for typescript.

## .babelrc

- babel config

## webpack.common.js

- general config for webpack. used for loading plugins and scripts for generating the final code

## webpack.dev.js

- config for webpack when compiling for development

## webpack.prod.js

- config for webpack when compiling for production

<br/><br/>

# Visual Studio Code extensions

## Prettier - Code formatter

- autoformatter extension for vs code. uses the .prettierrc file
