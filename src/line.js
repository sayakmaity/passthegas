import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React from "react";

const LineGraph = ({ data }) => {
  return (
    <LineChart width={650} height={400} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#ccc" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="energy" stroke="#8884d8" />
    </LineChart>
  );
};

export default LineGraph;
