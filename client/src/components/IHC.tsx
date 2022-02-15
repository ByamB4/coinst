import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
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

const Wrapper = styled.div``;

const IHChart = () => {
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
    <Wrapper ref={chartRef}>
      <LineChart
        width={10000}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="mnt"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Wrapper>
  );
};

export default IHChart;
