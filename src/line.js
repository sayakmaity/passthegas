import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React from 'react';

const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 500 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 600 },
    { name: 'Jun', value: 400 },
    { name: 'Jul', value: 800 },
    { name: 'Aug', value: 700 },
    { name: 'Sep', value: 900 },
    { name: 'Oct', value: 1000 },
    { name: 'Nov', value: 1200 },
    { name: 'Dec', value: 1100 },
  ];

const LineGraph = () => {
    return (
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    );
  }

export default LineGraph;