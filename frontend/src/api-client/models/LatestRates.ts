export type LatestRates = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  // TODO - Make this dynamic
  rates: {
    USD: number;
    EUR: number;
    GBP: number;
  }
}
