import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// configuring dotenv to access private API key
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// backend should not be initiated without Exchange Rates API key properly defined
if (!process.env.EXCHANGE_RATES_API_KEY) {
  throw Error('Exchange Rates API Key must be specified within the environment file.');
}

const port = 3001;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
