# ElectionsLive Astro Project

This project is a prototype for the ElectionsLive project. It is built using AstroJs and React.

# Tech Stack

-   [Astrojs](https://astro.build/)
-   [React](https://reactjs.org/)
-   [Typescript](https://www.typescriptlang.org/)

# Pre-requisites

We are using [Nodejs](https://nodejs.org/en) >= 18 and npm for this project. To install the dependencies, run the following commands:

```bash
npm ci && npm run prepare
```

> :warning: **Be sure to use the latest version of [npm](https://www.npmjs.com/) and [Nodejs](https://nodejs.org/en) >= 18!**

For Mac you can use [NVM](https://nodejs.org/en/download/package-manager#nvm) to install nodejs >= 18 and switch between versions.

Install NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Install Nodejs 18

```bash
nvm install 18
```

Switch to Nodejs 18

```bash
nvm use 18
```

# Developing

To start the development server, run the following command:

```bash
npm start
```

# Testing

We are using [Playwright](https://playwright.dev/) for testing. To run the tests, run the following command:

```bash
npm run test
```

Maybe you have to install the playwright dependencies first:

```bash
npx playwright install --with-deps chromium

npx playwright install --with-deps webkit

npx playwright install --with-deps firefox

npx playwright install --with-deps msedge
```
