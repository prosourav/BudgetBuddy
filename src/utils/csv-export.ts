import { Transaction } from "@/types";
import { unparse } from "papaparse";

export const exportToCsv = (filteredAndSortedData: Transaction[]) => {
  const formattedData = filteredAndSortedData.map(transaction => ({
    name: transaction.name,
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount,
    tag: transaction.tag,
  }));

  const csv = unparse(formattedData);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "transactions.csv";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};