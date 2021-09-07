import { Request, Response } from "express";
import { ILatestRatesEndpoint } from "../types";
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = "http://api.exchangeratesapi.io/v1";

export const getExchangeRates = (req: Request, res: Response): void => {
  const url = '/latest';
  const accessKey = `?access_key=${process.env.EXCHANGE_RATES_API_KEY}`;
  const currencies = ["USD", "EUR", "GBP"];

  axios.get(`${url}${accessKey}&symbols=${currencies.toString()}`)
    .then((response: AxiosResponse) => {
      const latestRates: ILatestRatesEndpoint = response.data;
      res.send(latestRates);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
}