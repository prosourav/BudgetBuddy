'use client'
import Card from '@/components/Card';
import './globals.css';
import React, { useState } from 'react';
import ModalManager from '@/components/ModalManeger';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transactionSchema } from '@/schemas';
import { z } from 'zod';

interface CardInfo {
  title: string;
  btnText: string;
  op: 'resetBalance' | 'addIncome' | 'addExpense';
}

export type TransactionTypes = "income" | "expense" | "reset" | null;

const cards: CardInfo[] = [
  { title: 'Current Balance', btnText: 'Reset Balance', op: 'resetBalance' },
  { title: 'Total Income', btnText: 'Add Income', op: 'addIncome' },
  { title: 'Total Expenses', btnText: 'Add Expense', op: 'addExpense' }
];

const incomeOptions = { income: ["Salary", 'Freelance', "Investment"], expense: ["Food", "Education", "Office", "Other"] };

export type FormData = z.infer<typeof transactionSchema>;


export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState<TransactionTypes>(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(transactionSchema),
  });

  const operationMap = {
    addIncome: () => {
      setIsModalOpen('income');
    },
    addExpense: () => {
      setIsModalOpen('expense');
    },
    resetBalance: () => {
      setIsModalOpen('reset');
    }
  };

  const modalRoot = document.getElementById("modals");

  const onSubmit = async (data: FormData) => {
    console.log("Onsubmit called", data);
  };

  const handleResetBalance = async () => {
    console.log("Reset Balance called!");
  };

  return (
    <>
      {isModalOpen && modalRoot ?

        <ModalManager
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          modalRoot={modalRoot}
          incomeOptions={incomeOptions}
          register={register}
          reset={reset}
          resetBalance={handleResetBalance}
          submitValue={handleSubmit(onSubmit)}
          errors={errors}
        /> : null

      }

      <div className="container">
        <div className='cards-container'>
          {cards.map(card => (
            <Card
              key={card.title}
              title={card.title}
              amt={10}
              btnText={card.btnText}
              operation={operationMap[card.op]}
            />
          ))}
        </div>
        Dashboard
      </div>
    </>
  );
}
