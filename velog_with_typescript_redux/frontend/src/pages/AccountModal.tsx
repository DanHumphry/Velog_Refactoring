import useSetModal from '@hooks/useSetModal';
import React, { useState, useEffect } from 'react';
import '@styles/LoginModal.css';
import Login from '@components/AccountModal/Login';
import Join from '@components/AccountModal/Join';

function AccountModal() {
  const { showLoginModal } = useSetModal();
  const [changeAccount, setChangeAccount] = useState(false);

  const changeAccountText = () => setChangeAccount(!changeAccount);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) showLoginModal();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return changeAccount ? (
    <Join changeAccountText={changeAccountText} />
  ) : (
    <Login changeAccountText={changeAccountText} />
  );
}

export default AccountModal;
