import { FC, useEffect, useRef, useState } from "react";
import { ChartService, StoryService } from "services";

const data2 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const IHChart: FC = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState<any>();

  useEffect((): any => {
    const fetch = async () => {
      const chartData: any = await ChartService({
        symbol: "IHC/MNT",
        interval: 14400,
      });
      const result = chartData.map((item: any) => {
        return {
          time: new Date(item[0] * 1000)
            .toISOString()
            .split("T")[1]
            .slice(0, 5),
          mnt: item[1],
        };
      });
      setData(result);
      const storyData: any = await StoryService.getStories({
        username: "trader.erkhemee",
      });
      console.log("story", storyData);
    };
    return fetch();
  }, []);

  return <div ref={chartRef}></div>;
};

export default IHChart;
