'use client'
import React, { useState, useMemo } from 'react';
import { FaSearch } from 'react-icons/fa';
import TransactionTable from './Table';
import { TransactionsType, Transaction } from '@/types';
import { unparse } from "papaparse";
import { exportToCsv } from '@/utils/csv-export';

const Transactions: React.FC<TransactionsType> = ({ transactions }): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerpage = 5;
  const columns = useMemo(() => [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Tag",
      accessorKey: "tag",
    },
    {
      header: "Amount",
      accessorKey: "amount",
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
  ], []);

  const filteredAndSortedData = useMemo(() => {
    return transactions
      .filter((transaction: Transaction) =>
        transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (typeFilter === '' || transaction.type === typeFilter)
      )
      .sort((a: Transaction, b: Transaction) => {
        if (sortKey === 'date') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortKey === 'amount') {
          return b.amount - a.amount;
        }
        return 0;
      });
  }, [transactions, searchTerm, typeFilter, sortKey]);

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortKey(e.target.value);
  };

  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * dataPerpage, currentPage * dataPerpage);


  const handlePrevPage = () => {
    if (currentPage === 1) return;
    return setCurrentPage(prv => prv - 1);
  };
  const handleNextPage = () => {
    if (currentPage === Math.ceil(transactions.length / dataPerpage)) return;
    return setCurrentPage(prv => prv + 1);
  };

  const exportData = () => {
    return exportToCsv(filteredAndSortedData);
  };


  return (
    <>
      <div style={{ display: 'flex', margin: '10px 20px', gap: '20px' }}>
        <div className="input-flex search-box">
          <FaSearch style={{ paddingLeft: "10px" }} />
          <input
            placeholder="Search by Name"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
        </div>

        <div className="input-flex select-box">
          <select
            onChange={(e) => setTypeFilter(e.target.value)}
            value={typeFilter}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="my-table">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <h2 style={{ paddingLeft: '25px' }}>My Transactions</h2>

          <div className="radio-group input-radio">
            <label className="radio-button">
              <input
                type="radio"
                name="sort"
                value=""
                checked={sortKey === ''}
                onChange={handleSortChange}
              />
              <span>No Sort</span>
            </label>
            <label className="radio-button">
              <input
                type="radio"
                name="sort"
                value="date"
                checked={sortKey === 'date'}
                onChange={handleSortChange}
              />
              <span>Sort by Date</span>
            </label>
            <label className="radio-button">
              <input
                type="radio"
                name="sort"
                value="amount"
                checked={sortKey === 'amount'}
                onChange={handleSortChange}
              />
              <span>Sort by Amount</span>
            </label>
          </div>

          <button style={{ width: '160px' }} onClick={exportData}>
            Export to CSV
          </button>

        </div>
        <TransactionTable columns={columns} dataSource={paginatedData} />
        <div style={{ width: "200px", marginLeft: "auto", display: 'flex', gap: '10px' }}>
          <button style={{ background: "white", color: 'blue', border: '1px solid blue', cursor: `${currentPage === 1 ? 'not-allowed' : 'pointer'}` }}
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >Previous</button>
          <button style={{ background: "white", color: 'blue', border: '1px solid blue', cursor: `${currentPage === Math.ceil(transactions.length / dataPerpage) ? 'not-allowed': 'pointer'}` }}
            onClick={handleNextPage}
            disabled={currentPage === transactions.length}
          >
            Next</button>
        </div>
      </div>
    </>
  );
};

export default Transactions;