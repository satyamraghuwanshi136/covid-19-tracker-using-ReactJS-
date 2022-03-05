import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
  const [dailyData, setDailyData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };
    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            backgroundColor: 'rgba(187, 134, 252, 0.5)',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: '#3333ff',
            fontColor: 'dfe6e9',
            backgroundColor: 'rgb(3, 218, 198)',
            fill: true,
          },
        ],
      }}
      options={{
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(55, 0, 179, 0.7)', // makes grid lines from y axis red
              },
              ticks: {
                fontColor: '#dfe6e9',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: 'rgba(55, 0, 179, 0.7)', // makes grid lines from y axis red
              },
              ticks: {
                fontColor: '#dfe6e9',

                fontStyle: 'bold',
              },
            },
          ],
        },
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            lable: 'People',
            backgroundColor: ['rgba(187, 134, 252, 0.7)', 'rgba(3, 218, 198, 0.7) ', 'rgba(207, 102, 121, 0.7) '],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}`, fontColor: '#dfe6e9' },
        scales: {
          xAxes: [
            {
              gridLines: {
                color: 'rgba(55, 0, 179, 0.7)', // makes grid lines from y axis red
              },
              ticks: {
                fontColor: '#dfe6e9',
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                color: 'rgba(55, 0, 179, 0.7)', // makes grid lines from y axis red
              },
              ticks: {
                fontColor: '#dfe6e9',

                fontStyle: 'bold',
              },
            },
          ],
        },
      }}
    />
  ) : null;

  return <div className={styles.container}>{country ? barChart : lineChart}</div>;
};

export default Chart;
