import { ConfirmationModalProps } from '@/types';
import React, { Dispatch, SetStateAction } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  setIsOpen, title, resetBalance
}) => {

  const handleCancel = () => {
    setIsOpen(null);
  };

  return (
    <div className="modal-form">
      <span className="close" onClick={handleCancel}>
        <IoCloseOutline />
      </span>
      <h3 style={{ textAlign: "left", lineHeight: '1' }}>Confirmation</h3>
      <div>
        <p>{title}</p>
        <div className='buttonContainer'>
          <button className='cancelButton' onClick={handleCancel}>Cancel</button>
          <button className='confirmButton' onClick={resetBalance}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;