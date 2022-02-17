export const IHCAPI = async () => {
  const symbol: string = "IHC/MNT";

  // 86400 = 1 day
  // 14400 = 4 hour
  const interval: number = 14400;

  // Monday, January 18, 2021 8:28:34 AM
  const start: number = 1610958514;

  // Current date
  const end: number = Math.floor(+new Date() / 1000);

  let result: Array<any> = [];

  await fetch(
    `https://sapi.coinhub.mn/v1/market/kline?market=${symbol}&interval=${interval}&start=${start}&end=${end}`,
    {
      method: "POST",
    }
  )
    .then((resp) => resp.json())
    .then(({ data }) => {
      result = data;
    });

  return result;
};
