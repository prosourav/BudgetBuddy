'use client'
import Card from '@/components/Card';
import './globals.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ModalManager from '@/components/ModalManeger';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transactionSchema } from '@/schemas';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { cards, incomeOptions, InitTransTotal } from '@/constants';
import { CardInfo, ExtendedFormData, PayloadType, Transaction, TransactionTypes } from '@/types';
import LineChartComponent from '@/components/LineChart';
import Transactions from '@/components/Transaction';

export type FormData = z.infer<typeof transactionSchema>;

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<TransactionTypes>(null);
  const [transTotals, setTransTotals] = useState({ ...InitTransTotal });
  const [transactions, setTransactions] = useState<Transaction[]>([] as Transaction[]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(transactionSchema),
  });

  useEffect(() => {
    fetchBalance();
    fetchTransaction();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/get-balance');
      if (response.ok) {
        const data = await response.json();
        setTransTotals(data);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const fetchTransaction = async () => {
    try {
      const response = await fetch('/api/get-transactions');
      if (response.ok) {
        const { data } = await response.json();
        setTransactions(() => data.map((item: { attributes: Record<string, string> }) => {
          delete item.attributes.user;
          return item.attributes;
        }));
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const onSubmit = async (data: FormData) => {
    const extendedData: ExtendedFormData = {
      ...data,
      type: incomeOptions.income.includes(data.tag as string) ? 'income' : 'expense',
    };

    const payload: PayloadType = { data: extendedData };

    try {
      const response = await fetch('/api/add-transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        return toast.error("Something went wrong");
      }
      await response.json();
      toast.success("Transaction successfully added");
      reset();
      setIsModalOpen(null);
      fetchBalance();
      return fetchTransaction()
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleResetBalance = async () => {
    try {
      const response = await fetch('/api/reset-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return toast.error("Something went wrong");
      }
      await response.json();
      toast.success("Transaction reset successfully");
      reset();
      setIsModalOpen(null);
      fetchBalance();
      return fetchTransaction();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const operationMap: Record<CardInfo['op'], () => void> = {
    addIncome: () => setIsModalOpen('income'),
    addExpense: () => setIsModalOpen('expense'),
    resetBalance: () => setIsModalOpen('reset'),
  };


  const allCards = useCallback(() => {
    return cards.map((card) => {
      if (card.title.toLowerCase() === 'current balance') {
        card.amt = transTotals?.balance;
      } else if (card.title.toLowerCase() === 'total income') {
        card.amt = transTotals?.totalIncome;
      } else if (card.title.toLowerCase() === 'total expenses') {
        card.amt = transTotals?.totalExpenses;
      }
      return card;
    });
  }, [transTotals]);

  const memoizedLineChart = useMemo(() => {
    return <LineChartComponent transactions={transactions} />;
  }, [transactions]);

  return (
    <>
      {isModalOpen && (
        <ModalManager
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          incomeOptions={incomeOptions}
          register={register}
          reset={reset}
          resetBalance={handleResetBalance}
          submitValue={handleSubmit(onSubmit)}
          errors={errors}
        />
      )}

      <div className="container">
        <div className='cards-container'>
          {allCards()?.length && allCards().map(card => (
            <Card
              key={card.title}
              title={card.title}
              amt={card.amt}
              btnText={card.btnText}
              operation={operationMap[card.op]}
            />
          ))}
        </div>
        <div className='stat-wrapper'>
          {memoizedLineChart}
        </div>
        <div>
          <Transactions transactions={transactions} />
        </div>
      </div>
    </>
  );
}