'use client'
import { doLogout } from '@/app/actions';
import storage from '@/utils/storage';
import React from 'react';
import { FaUser } from 'react-icons/fa';

const Logout: React.FC = (): JSX.Element => {

  const handleLogout = () => {
    storage.destroy();
    doLogout();
  };
  return (
    <p className="user-nav" onClick={handleLogout} >
      <span style={{ cursor: 'pointer' }}>
        <FaUser />
      </span>
      Logout

    </p>
  );
};

export default Logout;