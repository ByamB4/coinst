import { FC, useEffect, useRef, useState } from "react";
import { ChartService, StoryService } from "services";

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
