import type { NextPage } from "next";
import dynamic from "next/dynamic";

const IHChart = dynamic(() => import("components/IHC"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div>
      <IHChart />
    </div>
  );
};

export default Home;
