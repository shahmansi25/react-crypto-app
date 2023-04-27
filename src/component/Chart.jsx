import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale,PointElement,LineElement,Title,Tooltip,Legend);

const ChartComponent = ({ arr = [], currency, days }) => {
    const prices = [];
  const dates = [];
  arr.forEach((item) => { 
    if (days === '24h') dates.push(new Date(item[0]).toLocaleTimeString());
    else dates.push(new Date(item[0]).toLocaleString());
    prices.push(item[1]);
  })
   
  return (
    <Line options={{ responsive: "true" }}
      data = {
      {
      labels: dates,
     datasets: [{
       label: `Price in ${currency}`,
       data: prices,
       borderColor: "rgb(255,99,132)",
       backgroundColor:"rgba(255,99,132,0.3)",
      }]
      }}></Line>
  )
}

export default ChartComponent