export interface ILatestRatesEndpoint {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    USD: number;
    EUR: number;
    GBP: number;
  }
}