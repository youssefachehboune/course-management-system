# Course Management System API

## Table of Contents

- [Installation](#installation)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Pre-Commit Hooks](#pre-commit-hooks)
- [Code Formatting](#code-formatting)
- [Testing](#testing)
- [API Documentation](#api-documentation)

## Installation

1. Clone the repository:
    ```bash ```
    ```bash 
     git clone https://github.com/youssefachehboune/Course-Management-System.git &&
     && cd course-management-system
    ```

2. Install dependencies:
    ```bash 
    npm install
    ```

## Running the App

### Development

To start the development server, use the following command:

```bash 
  npm run start:dev
```

The application will run on `http://localhost:3001` by default.

### Production

To build and run the app in production:

```bash npm run build &&
 npm run start:prod
 ```

## Environment Variables

The application uses environment variables stored in the `.env` file for various configurations. Make sure to set the following variables in your `.env` file:

- ` `: 

## Scripts

Here are some useful scripts for managing the app:
```bash
  npm run start:dev # Starts the app in development mode with hot reloading.
  npm run build # Builds the app for production.
  npm run start:prod # Starts the built app in production mode.
  npm run lint # Runs the linter (ESLint) to check for code quality issues.
  npm run format # Formats the codebase using Prettier.
  npm run test # Runs unit tests.
  npm run test:e2e # Runs end-to-end tests.
  npm run test:cov # Runs tests and generates coverage reports.
```
## Pre-Commit Hooks

I use [Husky](https://github.com/typicode/husky) to manage Git hooks and ensure code quality before committing.

### Commit Linting

To enforce consistent commit messages, I use [commitlint](https://github.com/conventional-changelog/commitlint). Husky will trigger commitlint on every commit to verify that the commit message follows the conventional commit format.

### Prettier and Linting on Commit

Husky is also set up to run `eslint` and `prettier --write` on staged files before each commit to maintain code quality.

### Setting up Husky

Husky is automatically configured when you run `npm install`. You can find the Husky hooks in the `.husky` directory.

To manually install Husky hooks, run:

```bash
npx husky install
```
## Code Formatting

This project uses [Prettier](https://prettier.io/) for code formatting. Prettier is run automatically on every commit to ensure consistent code style.

To manually format the code:

```bash
 npm run format
 ```

## Testing

The project includes both unit and end-to-end tests. I use [Jest](https://jestjs.io/) as the testing framework.
- **Unit tests:** Run  ```bash npm run test  ``` to execute unit tests.
- **End-to-End tests:** Run ```bash npm run test:e2e ``` for end-to-end tests.
- **Test Coverage:** Run ```bash npm run test:cov ```to generate a test coverage report.

You can find the tests in the `test` directory. For example, the `e2e` directory contains end-to-end tests, and the `unit` directory contains unit tests for individual modules.

## API Documentation

The API documentation is generated using [Swagger](https://swagger.io/). To access the Swagger documentation, start the server and navigate to:
http://localhost:3001/api 