import express from "express";
import request from "supertest";
import ExchangeRoute from '../index';
import { ILatestRatesEndpoint } from "../../types";

const app = express();
app.use("/exchange", ExchangeRoute);

describe('Exchange Service Route', () => {
  it("GET - Latest Rates", async () => {
    const result: ILatestRatesEndpoint = (await request(app).get("/exchange/rates")).body;
    expect(result.success).toEqual(true);
    expect(result.base).toEqual("EUR");
    expect(result.rates.EUR).toEqual(1);
  });
});
