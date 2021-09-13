# Currency Exchange App

Currency Exchange App was created with the purpose of allowing people to exchange money between their own wallets through a simple interface.
Note: This app **do not** exchange real money. This is used just to manage the exchange, getting the most up-to-date exchange values based on the data from the European Central Bank data, through the ExchangeRatesAPI.io APIs.


## Requirements
- Node.js
- Yarn or NPM

## Installation
Run the following command on project root folder to get the dependencies installed:

**Yarn:**

    $ yarn
or 

**NPM:**

    npm install

## Initial Setup


The backend uses ExchangeRates.io APIs to fetch the most up-to-date currency exchange values.
To have the backend running properly, you must create an account on https://exchangeratesapi.io and generate an API key.
This API must be copied to an environment file (.env), so the API can be fetched succesfully.
To achieve this do the following:
- Create an `.env` file within the `backend` folder.
- Edit this `.env` file and create a key called `EXCHANGE_RATES_API_KEY`.
- Paste your copied API key from exchangeratesapi.io as the value, so your `.env` file should be `EXCHANGE_RATES_API_KEY={your_api_key}`.

## Running the application

The following command will start both `back end` and `front end` as well:

    yarn start
OR

    npm run start
    
The command above runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


## Tests

The application uses [Jest](https://jestjs.io/docs/getting-started) and [SuperTest](https://github.com/visionmedia/supertest) for testing, so run the following command to run the unit tests:

    yarn test
OR

    npm run test


## Link for the demo

