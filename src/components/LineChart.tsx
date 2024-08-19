import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { TransactionsType, Transaction } from '@/types';
import { initPie, initTransactions } from '@/constants';


ChartJS.register(CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent: React.FC<TransactionsType> = ({ transactions }) => {
  const [chartData, setChartData] = useState({ ...initTransactions });

  useEffect(() => {
    if (transactions) {
      const monthlyBalances = calculateMonthlyBalances(transactions);

      setChartData({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Monthly Balance',
            data: monthlyBalances,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.3,
          },
        ],
      });
    }
  }, [transactions]);

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Balance',
        },
      },
      // x: {
      //   title: {
      //     display: true,
      //     text: 'Month',
      //   },
      // },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };

  function calculateMonthlyBalances(transactions: Transaction[]): number[] {
    const monthlyBalances = Array(12).fill(0);

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const month = date.getMonth();
      const amount = transaction.amount;

      if (transaction.type === 'income') {
        monthlyBalances[month] += amount;
      } else {
        monthlyBalances[month] -= amount;
      }
    });

    // Calculate cumulative balance
    for (let i = 1; i < monthlyBalances.length; i++) {
      monthlyBalances[i] += monthlyBalances[i - 1];
    }
    return monthlyBalances;
  }

  const expenseStat = transactions.filter(transaction => transaction.type === 'expense').map(transaction => {
    return { amt: transaction.amount, tag: transaction.tag };
  });

  const getDataSet = (expenses: { amt: number, tag: string }[]) => {
    if (expenses && expenses.length > 0) {
      const labels: string[] = [];
      const data: number[] = [];

      expenses.forEach((expense) => {
        const tagIndex = labels.indexOf(expense.tag);
        if (tagIndex !== -1) {
          data[tagIndex] += expense.amt;
        } else {
          labels.push(expense.tag);
          data.push(expense.amt);
        }
      });

      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: [
              '#36A2EB',
              '#4BC0C0',
              '#9966FF',
              '#FFCE56',
              '#FF6384',
              '#FF9F40',
            ],
            hoverBackgroundColor: [
              '#36A2EB',
              '#4BC0C0',
              '#9966FF',
              '#FFCE56',
              '#FF6384',
              '#FF9F40',
            ],
          },
        ],
      };
    } else {
      return initPie;
    }
  };

  return (
    <div className='chart-container'>
      <div className='line-chart-wrapper'>
        <p className='line-chart-title'>Balance Statistics</p>
        <Line data={chartData} options={lineOptions} />
      </div>
      <div className='pie-chart-wrapper'>
        <p className='pie-chart-title'>Expense Statistics</p>
        <div className='pie-wrapper'>
          {expenseStat.length ? <Pie data={getDataSet(expenseStat)} options={pieOptions} /> : <small>Seems like you have not spent anything till now...</small>}
        </div>
      </div>
    </div>
  );
};

export default LineChartComponent;
