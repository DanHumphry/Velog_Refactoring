import ButtonLoader from '@loader/ButtonLoader';
import { RootState } from '@reducers/index';
import React, { useEffect } from 'react';
import '@styles/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import JoinEmailSection from '@components/AccountModal/JoinEmailSection';
import JoinPasswordSection from '@components/AccountModal/JoinPasswordSection';
import { SET_ACCOUNT_TEXT, SET_LOGIN_MODAL, SIGN_UP_REQUEST } from '@thunks/user';
import SocialAPI from '@components/AccountModal/SocialAPI';

function Join() {
  const dispatch = useDispatch();
  const { signUpError, signUpLoading, loginModal, accountText } = useSelector((store: RootState) => store.user);

  const submitJoinButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isReturn = false;
    const tar = e.target as Element | any;

    tar.childNodes.forEach((item: ChildNode) => {
      if (item.nodeName === 'DIV') {
        item.childNodes.forEach((p: any) => {
          if (p.className !== 'case ok' && !isReturn) {
            alert(`${p.innerText}을 해주세요.`);
            isReturn = true;
          }
        });
      }
    });

    if (isReturn) return;

    dispatch(
      SIGN_UP_REQUEST({
        email: tar.elements.email.value,
        password: tar.elements.password.value,
      }),
    );
  };

  useEffect(() => {
    if (signUpError) alert(signUpError);
  }, [signUpError]);

  return (
    <div className="login-container">
      <div className="join-box login-box">
        <div className="exit">
          <button type="button" onClick={() => dispatch(SET_LOGIN_MODAL(!loginModal))}>
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
        <span className="spanText">회원가입</span>
        <form className="JoinForm" onSubmit={(e) => submitJoinButton(e)}>
          <JoinEmailSection />
          <JoinPasswordSection />
          <button type="submit" className="JoinLoign-button">
            {signUpLoading ? <ButtonLoader /> : '회원가입'}
          </button>
        </form>
        <section className="social-box">
          <h4>소셜 계정으로 회원가입</h4>
          <div className="socialIconSection">
            <SocialAPI />
          </div>
        </section>
        <div className="login-foot">
          <span className="spanText">이미 회원이신가요 ?</span>
          <div className="foot-link">
            <button type="button" onClick={() => dispatch(SET_ACCOUNT_TEXT(!accountText))}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
