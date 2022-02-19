import { ChartParams } from "./types";
import rest from "./api";

const ChartService = async (body: ChartParams) => {
  // Monday, January 18, 2021 8:28:34 AM
  const start: number = 1610958514;

  // Current date
  const end: number = Math.floor(+new Date() / 1000);

  return rest.post(
    `https://sapi.coinhub.mn/v1/market/kline?market=${body.symbol}&interval=${body.interval}&start=${start}&end=${end}`
  );
};

export default ChartService;
