import { IBalance } from "interfaces";

export const getBalanceBySymbol = (
  data: IBalance[],
  symbol: string,
) => {
  if (data) return data.find((x: { symbol: string }) => x.symbol === symbol)! || {
    available: 0
  }
};


export const getBalanceByMarket = (
  data: any,
  market: string,
): any => {
  if (data) return data.find((x: { market: string }) => x.market === market)! || {
    available: 0,
    close: 0
  }
};
export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
