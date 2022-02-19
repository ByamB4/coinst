import { FC, useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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

  return (
    <div ref={chartRef}>
      <LineChart
        width={1500}
        height={700}
        data={data}
        margin={{
          top: 50,
          right: 0,
          left: 0,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="0 1" />
        {/* <XAxis dataKey="time" /> */}
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line
          type="basisOpen"
          dataKey="mnt"
          dot={false}
          stroke="#4714A1"
          strokeWidth={1.5}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </div>
  );
};

export default IHChart;
