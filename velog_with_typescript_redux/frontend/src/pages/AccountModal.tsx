import { RootState } from '@reducers/index';
import { SET_LOGIN_MODAL } from '@thunks/user';
import React, { useEffect } from 'react';
import '@styles/LoginModal.css';
import Login from '@components/AccountModal/Login';
import Join from '@components/AccountModal/Join';
import { useDispatch, useSelector } from 'react-redux';

function AccountModal() {
  const dispatch = useDispatch();
  const { accountText } = useSelector((store: RootState) => store.user);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) dispatch(SET_LOGIN_MODAL(false));
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return accountText ? <Join /> : <Login />;
}

export default AccountModal;
