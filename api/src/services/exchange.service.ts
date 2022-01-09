import { Request, Response, NextFunction } from "express";
import { ILatestRatesEndpoint } from "../types";
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = "http://api.exchangeratesapi.io/v1";

export const getExchangeRates = (req: Request, res: Response, next: NextFunction): void => {
  const url = '/latest';
  const accessKey = `?access_key=${process.env.EXCHANGE_RATES_API_KEY}`;
  const currencies = ["USD", "EUR", "GBP"];

  axios.get(`${url}${accessKey}&symbols=${currencies.toString()}`)
    .then((response: AxiosResponse) => {
      const latestRates: ILatestRatesEndpoint = response.data;

      if (!latestRates.success) {
        throw new Error("The request didn't success properly. Please try again later. Please reach our support if it keeps not working.");
      }
      res.send(latestRates);
    })
    .catch((error) => {
      next(error);
    });
}