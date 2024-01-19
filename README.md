# ElectionsLive Astro Project

This project is a prototype for the ElectionsLive project. It is built using AstroJs and React.

# Table of contents

-   [ElectionsLive Astro Project](#electionslive-astro-project)
-   [Table of contents](#table-of-contents)
-   [Tech Stack](#tech-stack)
-   [Pre-requisites](#pre-requisites)
-   [Developing](#developing)
-   [Testing](#testing)
-   [Structure](#structure)
    -   [Bootstrap](#bootstrap)
        -   [`paramService.ts`](#paramservicets)
        -   [`configService.ts`](#configservicets)
        -   [`styleService.ts`](#styleservicets)
        -   [`labelsService.ts`](#labelsservicets)
        -   [`dataService.ts`](#dataservicets)
    -   [Widgets](#widgets)
    -   [Components](#components)

# Tech Stack

-   [Astrojs](https://astro.build/) (for the page rendering)
-   [React](https://reactjs.org/) (for the low level components)
-   [nanostores](https://github.com/nanostores/nanostores) (for state management)
-   [Typescript](https://www.typescriptlang.org/) (for type safety)

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

# Structure

## Bootstrap

Every widget and component is relying on the `<Bootstrap />` component. Every widget-component should wrap its low level components inside the `<Bootstrap />` component. The bootstrap component is located in the `src/components` folder.

```tsx
const ExampleWidget = () => {
    <Bootstrap widget="widget-name">
        <AnyComponent />
    </Bootstrap>;
};
```

The `<Bootstrap />` component is calling `services`, located in `src/services`, that are responsible for the following:

### `paramService.ts`

-   handling the search parameters given in the URL

### `configService.ts`

-   fetching the adminConfig
-   fetching the custom configurations and merge into the adminConfig

### `styleService.ts`

-   fetching the custom styles

### `labelsService.ts`

-   fetching the labels
-   fetching the custom labels and merge into the labels

### `dataService.ts`

-   fetching the data for the widget

Fetched data, configs, labels, params are synchronized with the `nanostores` state management. Every widget and component can subscribe to the `nanostores` to get the latest data, configs, labels, params. The state management is done in the `src/stores` folder.

## Widgets

Every widget has its own `.astro` page-file that is build into its own `.html` file. The page-files are located in the `src/pages` folder.

Each widget page-file calls a widget-component that renders the widget and composits the low level components (e.g. bars, pies, maps etc.) used in it. The widget-components are located in the `src/widgets` folder.

## Components

The low level components are located in the `src/components` folder. They are used by the widget-components to render the widgets.

Each low-level component is responsible for its own state and data management. This should be done within a custom hook, so the logic can be [tested](#testing) easily.
