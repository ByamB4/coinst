import styled from "styled-components";
import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { IHCAPI } from "api";

const Wrapper = styled.div``;

const IHChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = React.useState<any>();

  useEffect(() => {
    const chart = createChart(chartRef.current!, { width: 400, height: 300 });
    const lineSeries = chart.addLineSeries();
  }, []);

  useEffect((): any => {
    const fetch = async () => {
      const resp = await IHCAPI();
      console.log(resp);
    };
    return fetch();
  }, [data]);

  return <Wrapper ref={chartRef}></Wrapper>;
};

export default IHChart;
