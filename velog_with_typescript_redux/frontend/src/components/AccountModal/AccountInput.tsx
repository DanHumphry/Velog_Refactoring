import useSetModal from '@hooks/useSetModal';
import { RootState } from '@reducers/index';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
} from '@reducers/user';

interface Props {
  accountText: string;
}

function AccountInput({ accountText }: Props) {
  const dispatch = useDispatch();
  const { showLoginModal } = useSetModal();
  const { userInfo } = useSelector((store: RootState) => store.user);

  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });

  const onChangeLoginInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLoginInfo({ username: '', password: '' });
  }, [accountText]);

  const accountReq = (info: { username: string; password: string }) => {
    const accoutInfo = {
      ...info,
      id: 1,
      email: '',
      mygit: '',
      nickname: info.username,
      myInfo: '',
      userPhoto: '',
    };
    let temp = false;
    userInfo.forEach((item) => {
      if (item.username === info.username && item.password === info.password) temp = true;
    });
    if (accountText === '로그인') {
      if (temp) {
        dispatch({
          type: LOG_IN_SUCCESS,
          data: userInfo.filter(
            (v: { username: string; password: string }) => v.username === info.username && v.password === info.password,
          )[0],
        });
        showLoginModal();
      } else {
        dispatch({
          type: LOG_IN_FAILURE,
          data: '일치하는 정보가 없습니다.',
        });
      }
    } else {
      dispatch({
        type: SIGN_UP_SUCCESS,
        data: accoutInfo,
      });
    }
  };

  return (
    <form>
      <input
        name="username"
        type="text"
        value={loginInfo.username}
        placeholder="아이디를 입력하세요"
        onChange={(e) => {
          onChangeLoginInfo(e);
        }}
      />
      <input
        name="password"
        type="password"
        value={loginInfo.password}
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => {
          onChangeLoginInfo(e);
        }}
      />
      <button
        type="button"
        className="JoinLoign-button"
        onClick={() => {
          accountReq(loginInfo);
        }}
      >
        {accountText}
      </button>
    </form>
  );
}
export default AccountInput;
