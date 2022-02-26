import rest from "./api";
import { DealsParams } from "./types";

const CoinhubService = {
  postInit: () =>
    rest.post(
      `https://sapi.coinhub.mn//v1/init?userid=${process.env.COINHUB_USERID}&token=${process.env.COINHUB_TOKEN}&channel=coinhub-prd`
    ),
  getBalanceBySymbol: (symbol: string, data: any) =>
    data.find((x: { symbol: string }) => x.symbol === symbol),
  postTickers: () => rest.post(`https://sapi.coinhub.mn/v1/market/tickers`),
  postDeals: (body: DealsParams) =>
    rest.post(
      `https://sapi.coinhub.mn/v1/market/deals?market=${body.symbol}&limit=${body.limit}&last_id=0`
    ),
  processDeals: (
    data: {
      amount: string;
      price: string;
      time: number;
      id: number;
      type: "sell" | "bug";
    }[]
  ) => {
    let buyAmount: number = 0;
    let sellAmount: number = 0;

    data.forEach((x: { type: "sell" | "bug"; amount: string }) => {
      if (x.type === "sell") {
        sellAmount += Number(x.amount);
      } else {
        buyAmount += Number(x.amount);
      }
    });
    const percent =
      100 * Math.abs((buyAmount - sellAmount) / ((buyAmount + sellAmount) / 2));

    if (buyAmount > sellAmount) {
      console.log("buy", percent);
    } else {
      console.log("sell", percent);
    }
  },
};

export default CoinhubService;
