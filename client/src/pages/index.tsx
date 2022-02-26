import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { CoinhubService } from "services";

// const IHChart = dynamic(() => import("components/IHC"), {
//   ssr: false,
// });

const Home: NextPage = () => {
  const [ihc, setIHC] = useState<{
    volume: number;
    high: number;
    deal: number;
    close: number;
    low: number;
    open: number;
    change: number;
    timestamp: number;
    market: string;
  }>({
    volume: 0,
    high: 0,
    deal: 0,
    close: 0,
    low: 0,
    open: 0,
    change: 0,
    timestamp: 0,
    market: "",
  });

  const [init, setInit] = useState<{
    user: {
      username: string;
    };
    balance: {
      symbol: string;
      available: number;
      freeze: number;
    }[];
  }>({ user: { username: "" }, balance: [] });

  const [ihcBalance, setIhcBalance] = useState<{
    symbol: string;
    available: number;
    freeze: number;
  }>({
    symbol: "IHC",
    available: 0,
    freeze: 0,
  });

  // const [latestPercent, setLatestPercent] = useState<number>(0);

  useEffect((): any => {
    const fetch = async () => {
      const initData: any = await CoinhubService.postInit();
      setInit(initData);
      setIhcBalance(
        await CoinhubService.getBalanceBySymbol("IHC", initData.balance)
      );
      const tickers: any = await CoinhubService.postTickers();
      setIHC(tickers["IHC/MNT"]);
      await CoinhubService.postDeals({
        symbol: "IHC/MNT",
        limit: 100,
      });
    };
    return fetch();
  }, []);

  useEffect(() => {
    var latestPercent = 0;
    const interval = setInterval(async () => {
      const initData: any = await CoinhubService.postInit();
      setInit(initData);
      setIhcBalance(
        await CoinhubService.getBalanceBySymbol("IHC", initData.balance)
      );
      const tickers: any = await CoinhubService.postTickers();
      setIHC(tickers["IHC/MNT"]);
      const resp: any = await CoinhubService.postDeals({
        symbol: "IHC/MNT",
        limit: 100,
      });
      const result = CoinhubService.processDeals(resp, latestPercent);
      console.log(result.percent, latestPercent);
      if (result.percent !== latestPercent) {
        latestPercent = result.percent;
      }
      if (result.action === "buy") {
        const mntBalance = await CoinhubService.getBalanceBySymbol(
          "MNT",
          initData.balance
        );
        const resp = await CoinhubService.orderCreate({
          action: "buy",
          amount: mntBalance.available,
        });
        console.log(`[+] Buy`);
      }

      if (result.action === "sell") {
        const resp = await CoinhubService.orderCreate({
          action: "sell",
          amount: ihcBalance.available,
        });
        console.log(`[-] Sell`);
      }

      if (result.action === "stay") {
        console.log(`[+] Stay`);
      }
      console.log("========= DEBUG =========");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getUserTotalBalance = () => {
    const a = init.balance.find((x: { symbol: string }) => x.symbol === "MNT");
    if (a) {
      return a.available + a.freeze;
    }
    return 0;
  };

  return (
    <div className="bg-red-200 text-2xl p-40">
      <div>Current price: {ihc.close}</div>
      <div>User: {init.user.username}</div>
      <div>
        User balance available ({ihcBalance.symbol}): {ihcBalance.available} ={" "}
        {ihcBalance.available * ihc.close}
      </div>
      <div>
        User balance freeze ({ihcBalance.symbol}): {ihcBalance.freeze}
      </div>
      <div>User balance (MNT): {getUserTotalBalance()}</div>
    </div>
  );
};

export default Home;
