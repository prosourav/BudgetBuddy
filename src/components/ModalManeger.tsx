import React from 'react';
import { createPortal } from 'react-dom';
import Modal from '@/components/Modal';
import TransactionForm from '@/components/TransactionForm';
import { FormData, TransactionTypes } from '@/app/page';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ConfirmationModal from './ConfirmationForm';

interface ModalManagerProps {
  isModalOpen: TransactionTypes;
  setIsModalOpen: React.Dispatch<React.SetStateAction<TransactionTypes>>;
  modalRoot: HTMLElement | null;
  incomeOptions: { income: string[], expense: string[] };
  register: UseFormRegister<FormData>
  errors: FieldErrors<{
    name: string;
    amount: string;
    date: string;
    type: string;
  }>;
  submitValue: () => void;
  reset: () => void;
  resetBalance: () => void;
}



const ModalManager: React.FC<ModalManagerProps> = ({ isModalOpen, setIsModalOpen, modalRoot, incomeOptions, reset, register, submitValue, errors, resetBalance }) => {
  if (!isModalOpen || !modalRoot) return null;


  return createPortal(
    <Modal open={!!isModalOpen} setIsOpen={setIsModalOpen} reset={reset}>
      {(isModalOpen === 'income' || isModalOpen === 'expense') &&
        <TransactionForm
          title={isModalOpen === 'income' ? "Income" : "Expense"}
          options={isModalOpen === 'income' ? incomeOptions.income : incomeOptions.expense}
          setIsOpen={setIsModalOpen} register={register}
          reset={reset}
          errors={errors} submitValue={submitValue} />
      }
      {isModalOpen === 'reset' && <ConfirmationModal title='Are you sure you want to reset balance?' setIsOpen={setIsModalOpen} resetBalance={resetBalance} />}
    </Modal>,
    modalRoot
  );
};

export default ModalManager;
