import React from 'react';
import { createPortal } from 'react-dom';
import Modal from '@/components/Modal';
import TransactionForm from '@/components/TransactionForm';
import ConfirmationModal from './ConfirmationForm';
import { ModalManagerProps } from '@/types';


const ModalManager: React.FC<ModalManagerProps> = ({
  isModalOpen,
  setIsModalOpen,
  incomeOptions,
  reset,
  register,
  submitValue,
  errors,
  resetBalance,
}) => {
  const modalRoot = document.getElementById("modals");

  if (!modalRoot || !isModalOpen) return null; // Ensure modalRoot exists

  return createPortal(
    <Modal open={!!isModalOpen} setIsOpen={setIsModalOpen} reset={reset}>
      {(isModalOpen === 'income' || isModalOpen === 'expense') && (
        <TransactionForm
          title={isModalOpen === 'income' ? "Income" : "Expense"}
          options={isModalOpen === 'income' ? incomeOptions.income : incomeOptions.expense}
          setIsOpen={setIsModalOpen}
          register={register}
          reset={reset}
          errors={errors}
          submitValue={submitValue}
        />
      )}
      {isModalOpen === 'reset' && (
        <ConfirmationModal
          title="Are you sure you want to reset balance?"
          setIsOpen={setIsModalOpen}
          resetBalance={resetBalance}
        />
      )}
    </Modal>,
    modalRoot
  );
};

export default ModalManager;
