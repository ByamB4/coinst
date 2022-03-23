import { IBalance } from "interfaces";

export const getBalanceBySymbol = (
  symbol: string,
  data: IBalance[]
): IBalance => data.find((x: { symbol: string }) => x.symbol === symbol)!;

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
