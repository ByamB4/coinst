import { TITLE } from "configs/app";
import { MainLayout } from "layouts";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { CoinhubService } from "services";

const INTERVAL_SECONDS = 5;
const INTERVAL_MILLISECONDS = INTERVAL_SECONDS * 1000;

const Home: NextPage = () => {
  const [initData, setInitData] = useState<any>();
  const [status, setStatus] = useState<boolean>(false);
  const [tickersData, setTickersData] = useState<
    {
      volume: number;
      high: number;
      deal: number;
      close: number;
      low: number;
      change: number;
      timestamp: number;
      market: string;
    }[]
  >();

  useEffect(() => {
    const interval = setInterval(async () => {
      // ======= START POSTINIT =======
      const postInitData = (await CoinhubService.postInit()) as any;
      setStatus(postInitData.status);
      setInitData(postInitData.data);
      // ======= END POSTINIT =======

      if (postInitData.status) {
        console.log("[+] Login success");
      }
      const postTickersData = (await CoinhubService.postTickers()) as any;
      setTickersData(postTickersData);
      // setData(initData.data);
      // setIhcBalance(getBalanceBySymbol("IHC", initData.data.balance));
      // const tickers: any = await CoinhubService.postTickers();
      // setIHC(tickers["IHC/MNT"]);
      // const resp: any = await CoinhubService.postDeals({
      //   symbol: "IHC/MNT",
      //   limit: 100,
      // });
      // const result = CoinhubService.processDeals(resp, latestPercent);
      // console.log(result.percent, latestPercent);
      // if (result.percent !== latestPercent) {
      //   latestPercent = result.percent;
      // }
      // if (result.action === "buy") {
      //   const mntBalance = getBalanceBySymbol("MNT", initData.data.balance);
      //   const resp = await CoinhubService.orderCreate({
      //     action: "buy",
      //     amount: mntBalance.available,
      //   });
      //   console.log(`[+] Buy`);
      // }
      // if (result.action === "sell") {
      //   const resp = await CoinhubService.orderCreate({
      //     action: "sell",
      //     amount: ihcBalance.available,
      //   });
      //   console.log(`[-] Sell`);
      // }
      // if (result.action === "stay") {
      //   console.log(`[+] Stay`);
      // }
      // console.log("========= DEBUG =========");
    }, INTERVAL_MILLISECONDS + 1000);

    return () => clearInterval(interval);
  }, []);

  // const getUserTotalBalance = () => {
  //   console.log(data);
  //   const a = data?.balance.find((x: { symbol: string }) => x.symbol === "MNT");
  //   if (a) {
  //     return a.available + a.freeze;
  //   }
  //   return 0;
  // };

  return (
    <MainLayout title={TITLE.homepage.index} className="flex flex-col gap-8">
      {status ? (
        <div>
          <div>User: {initData?.user?.username || ""}</div>
        </div>
      ) : (
        <>
          <h1>TOKEN died</h1>
        </>
      )}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Market
              </th>

              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Change
              </th>
              <th scope="col" className="px-6 py-3">
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {tickersData?.map((it: any) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={it.market}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                >
                  {it.market}
                </th>
                <td className="px-6 py-4">{it.close}</td>
                <td className="px-6 py-4">
                  {Math.round(it.change * 10000.0) / 100.0}
                </td>
                <td className="px-6 py-4">{it.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default Home;
