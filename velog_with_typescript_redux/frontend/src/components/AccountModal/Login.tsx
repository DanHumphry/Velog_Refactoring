import GoogleAPI from '@components/AccountModal/GoogleAPI';
import useInput from '@hooks/useInput';
import useSetModal from '@hooks/useSetModal';
import ButtonLoader from '@loader/ButtonLoader';
import { RootState } from '@reducers/index';
import { LOG_IN_REQUEST } from '@thunks/user';
import React, { useEffect } from 'react';
import '@styles/Login.css';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const { showLoginModal, changeAccountText } = useSetModal();
  const { logInError, logInLoading } = useSelector((store: RootState) => store.user);

  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');

  const dispatch = useDispatch();
  const submitLoginButton = () => {
    if (username === '' && password === '') alert('아이디와 비밀번호를 입력해주세요.');
    else if (username === '') alert('아이디를 입력해주세요.');
    else if (password === '') alert('비밀번호를 입력해주세요.');
    else dispatch(LOG_IN_REQUEST({ username, password }));
  };

  useEffect(() => {
    if (logInError) alert(logInError);
  }, [logInError]);

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
        <span className="spanText">로그인</span>
        <form>
          <input type="text" value={username} placeholder="아이디를 입력하세요" onChange={setUsername} />
          <input type="password" value={password} placeholder="비밀번호를 입력하세요" onChange={setPassword} />
          <button type="button" className="JoinLoign-button" onClick={submitLoginButton}>
            {logInLoading ? <ButtonLoader /> : '로그인'}
          </button>
        </form>
        <section className="social-box">
          <h4>소셜 계정으로 로그인</h4>
          <div className="googlebox">
            <GoogleAPI />
          </div>
        </section>
        <div className="login-foot">
          <span className="spanText">아직 회원이 아니신가요 ?</span>
          <div className="foot-link">
            <button type="button" onClick={changeAccountText}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
