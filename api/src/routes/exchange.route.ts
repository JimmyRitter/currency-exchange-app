import express from 'express';
import { getExchangeRates } from "../services";

const ExchangeRoute = express.Router();

ExchangeRoute.get('/rates', getExchangeRates);

export default ExchangeRoute;