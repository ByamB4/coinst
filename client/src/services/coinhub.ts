import rest from "./api";
import { TOKEN_DIED } from "constants/text";
import { DealsParams, PostInitResponse, TickersResponse } from "./types";
import { IBalance } from "interfaces";

const CoinhubService = {
  postInit: async () => {
    const resp = await rest.post<PostInitResponse>(
      `https://sapi.coinhub.mn//v1/init?userid=${process.env.COINHUB_USERID}&token=${process.env.COINHUB_TOKEN}&channel=coinhub-prd`
    );
    if (resp.user) {
      return {
        data: resp,
        status: true,
      };
    }
    return {
      data: resp,
      status: false,
      message: TOKEN_DIED,
    };
  },
  postTickers: async () => {
    const resp: TickersResponse = await rest.post(
      `https://sapi.coinhub.mn/v1/market/tickers`
    );

    const _sorted: {
      volume: number;
      high: number;
      deal: number;
      close: number;
      low: number;
      change: number;
      timestamp: number;
      market: string;
    }[] = [];

    Object.keys(resp)
      .sort((a, b) => resp[b].change - resp[a].change)
      .forEach((key) => {
        _sorted.push(resp[key]);
      });
    return _sorted;
  },
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
      type: "sell" | "buy";
    }[],
    latestPercent: number
  ): { action: "sell" | "buy" | "stay"; percent: number } => {
    let buyAmount: number = 0;
    let sellAmount: number = 0;

    // Will update logic later
    try {
      data.forEach((x: { type: "sell" | "buy"; amount: string }) => {
        if (x.type === "sell") {
          sellAmount += Number(x.amount);
        } else {
          buyAmount += Number(x.amount);
        }
      });

      const percent = Math.floor(
        (100 * (buyAmount - sellAmount)) / ((buyAmount + sellAmount) / 2)
      );
      console.log(`[+] Latest percent: ${latestPercent}`);
      console.log(`[+] Current percent: ${percent}`);
      if (buyAmount > sellAmount && percent > 20) {
        return { action: "buy", percent };
      } else if (buyAmount < sellAmount && percent < -20) {
        return { action: "sell", percent };
      }
      return { action: "stay", percent };
    } catch (error) {
      return { action: "stay", percent: latestPercent };
    }
  },

  orderCreate: (body: { action: "buy" | "sell"; amount: number }) => {
    rest.post(
      `https://sapi.coinhub.mn/v1/order/create?userid=${
        process.env.COINHUB_USERID
      }&token=${process.env.COINHUB_TOKEN}&channel=coinhub-prd&amount=${
        body.amount
      }&side=${body.action === "buy" ? "2" : "1"}&market=IHC/MNT`
    );
  },
};

export default CoinhubService;
