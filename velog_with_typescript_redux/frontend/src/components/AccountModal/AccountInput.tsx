import useInput from '@hooks/useInput';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOG_IN_REQUEST, SIGN_UP_REQUEST } from '@thunks/user';
import ButtonLoader from '@loader/ButtonLoader';

interface Props {
  accountText: string;
}

function AccountInput({ accountText }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [username, setUsername, resetUsername] = useInput('');
  const [password, setPassword, resetPassword] = useInput('');

  useEffect(() => {
    resetUsername('');
    resetPassword('');
  }, [accountText]);

  const accountReq = async (v: { username: string; password: string }) => {
    setLoading(true);

    if (accountText === '로그인') dispatch(LOG_IN_REQUEST(v));
    else dispatch(SIGN_UP_REQUEST(v));

    setLoading(false);
  };

  return (
    <form>
      <input type="text" value={username} placeholder="아이디를 입력하세요" onChange={setUsername} />
      <input type="password" value={password} placeholder="비밀번호를 입력하세요" onChange={setPassword} />
      <button type="button" className="JoinLoign-button" onClick={() => accountReq({ username, password })}>
        {loading ? <ButtonLoader /> : accountText}
      </button>
    </form>
  );
}
export default AccountInput;
