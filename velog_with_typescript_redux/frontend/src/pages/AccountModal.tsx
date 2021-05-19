import useSetModal from '@hooks/useSetModal';
import { RootState } from '@reducers/index';
import React, { useState, useEffect } from 'react';
import '@styles/LoginModal.css';
import Login from '@components/AccountModal/Login';
import Join from '@components/AccountModal/Join';
import { useSelector } from 'react-redux';

function AccountModal() {
  const { showLoginModal } = useSetModal();
  const { accountText } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) showLoginModal();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return accountText ? <Join /> : <Login />;
}

export default AccountModal;
