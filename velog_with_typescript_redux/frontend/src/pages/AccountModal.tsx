import AccountInput from '@components/AccountModal/AccountInput';
import GoogleAPI from '@components/AccountModal/GoogleAPI';
import useSetModal from '@hooks/useSetModal';
import React, { useState, useEffect } from 'react';
import '@styles/LoginModal.css';

function AccountModal() {
  const { showLoginModal } = useSetModal();

  const [accountText, setAccountText] = useState('로그인');

  const changeAccountText = () => {
    if (accountText === '로그인') setAccountText('회원가입');
    else setAccountText('로그인');
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27) showLoginModal();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="exit">
          <button type="button" onClick={showLoginModal}>
            <svg
              stroke="currentColor"
              fill="currentColor"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        </div>
        <span className="accountText">{accountText}</span>
        <AccountInput accountText={accountText} />
        <section className="social-box">
          <h4>소셜 계정으로 {accountText}</h4>
          <GoogleAPI />
        </section>
        <div className="login-foot">
          <span>이미 회원이신가요 ?</span>
          <button type="button" className="foot-link" onClick={changeAccountText}>
            {accountText === '회원가입' ? '로그인' : '회원가입'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountModal;
