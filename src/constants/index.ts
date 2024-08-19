import { CardInfo } from "@/types";

export const defaultValues = {
  email: "",
  password: "",
};

export const defaultCreateValues = {
  name: "",
  email: "",
  password: "",
};

export const cards: CardInfo[] = [
  { title: 'Current Balance', btnText: 'Reset Balance', op: 'resetBalance', amt: 0 },
  { title: 'Total Income', btnText: 'Add Income', op: 'addIncome', amt: 0 },
  { title: 'Total Expenses', btnText: 'Add Expense', op: 'addExpense', amt: 0 }
];

export const incomeOptions = { income: ["salary", 'freelance', "investment"], expense: ["food", "education", "office", "other"] };
export const InitTransTotal = { balance: 0, totalExpenses: 0, totalIncome: 0 };

// line Chart
export const initTransactions = {
  labels: [] as string[],
  datasets: [
    {
      label: 'Monthly Balance',
      data: [] as number[],
      fill: true,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.3,
    },
  ],
};
// Pie chart
export const initPie = {
  labels: [] as string[],
  datasets: [
    {
      label: 'Expense Categories',
      data: [0, 0], // Initial data, will be updated after calculation
      backgroundColor: ['#36A2EB', '#FF6384'],
      hoverBackgroundColor: ['#36A2EB', '#FF6384'],
    },
  ],
};