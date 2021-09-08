import { LatestRates } from "../models/LatestRates";
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = "http://localhost:3001";

export class ExchangeService {

  /**
   * Get Latest Rates
   * Returns a list of the latest rates
   * @returns LatestRates Successfully retrieved a list of exchange rates
   * @throws ApiError
   */
  public static async getLatestRates(): Promise<AxiosResponse<LatestRates>> {
    return axios.get('/exchange/rates');
  }
}