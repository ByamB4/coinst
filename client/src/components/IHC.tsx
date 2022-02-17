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
import { IHCAPI } from "api";

const dataDef = [
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
      const resp = await IHCAPI();
      const result = resp.map((item) => {
        return {
          time: new Date(item[0] * 1000)
            .toISOString()
            .split("T")[1]
            .slice(0, 5),
          mnt: item[1],
        };
      });
      console.log("asdas", result);
      setData(result);
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
