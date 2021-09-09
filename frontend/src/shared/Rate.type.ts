export type Rate = {
  symbol: string;
  price: number;
}

export type ExchangeData = {
  source: {
    currency: string;
    amount: number;
  }
  target: {
    currency: string;
    amount: number;
  }
}