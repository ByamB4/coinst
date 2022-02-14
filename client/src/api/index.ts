export const IHCAPI = async () => {
  const symbol: string = "IHC/MNT";
  const interval: number = 60;
  const start: number = 1644738344;
  const end: number = 1644826604;

  await fetch(
    `https://sapi.coinhub.mn/v1/market/kline?market=${symbol}&interval=${interval}&start=${start}&end=${end}`,
    {
      method: "POST",
    }
  )
    .then((resp) => resp.json())
    .then(({ data }) => {
      return data;
    });

  return [];
};
