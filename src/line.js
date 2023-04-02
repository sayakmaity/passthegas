import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import React from 'react';

const data = [
    { name: '10', energy: 2.75 },
    { name: '9', energy: 2.07 },
    { name: '8', energy: 0.88 },
    { name: '7', energy: 2.04 },
    { name: '6', energy: 3.08 },
    { name: '5', energy: 0.91 },
    { name: '4', energy: 0.93 },
    { name: '3', energy: 0.52 },
    { name: '2', energy: 4.77 },
    { name: '1', energy: 3.88 },
  ];

const LineGraph = () => {
    // console.log("Data", data)
    // var new_data = [];
    // for (var i = 0; i < 10; i++) {
    //     new_data.push(parseFloat(data["energy"]))
    // }
    return (
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="name"/>
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="energy" stroke="#8884d8" />
      </LineChart>
    );
  }

export default LineGraph;