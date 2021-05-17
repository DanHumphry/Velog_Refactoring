import useInput from '@hooks/useInput';
import useSetModal from '@hooks/useSetModal';
import ButtonLoader from '@loader/ButtonLoader';
import { SIGN_UP_REQUEST } from '@thunks/user';
import React, { useRef, useState } from 'react';
import '@styles/Login.css';
import GoogleAPI from '@components/AccountModal/GoogleAPI';
import { useDispatch } from 'react-redux';

interface Props {
  changeAccountText: () => void;
}

function Join({ changeAccountText }: Props) {
  const { showLoginModal } = useSetModal();

  const [email, setEmail] = useInput('');
  const [username, setUsername] = useInput('');
  const [password, setPassword] = useInput('');
  const [hiddenIdStyle, setHiddenIdStyle] = useState({ display: 'none' }); // input부분 클릭시 정규표현식 검사 식이 나오도록
  const [hiddenPwdStyle, setHiddenPwdStyle] = useState({ display: 'none' }); // 초기값 display : none세팅
  const [loading, setLoading] = useState(false);

  const case1Ref = useRef<HTMLParagraphElement | null>(null);
  const case2Ref = useRef<HTMLParagraphElement | null>(null);
  const case3Ref = useRef<HTMLParagraphElement | null>(null);
  const case4Ref = useRef<HTMLParagraphElement | null>(null);
  const case5Ref = useRef<HTMLParagraphElement | null>(null);

  const onFocusDisplay = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'username') setHiddenIdStyle({ display: 'block' });
    if (e.target.name === 'password') setHiddenPwdStyle({ display: 'block' });
  };

  const CheckId = (e: string) => {
    const regex = /^[a-z0-9]{4,20}$/;
    if (regex.test(e) === false && case1Ref.current !== null) {
      case1Ref.current.className = 'case no';
    } else if (regex.test(e) === true && case1Ref.current !== null) {
      case1Ref.current.className = 'case ok';
    }
  };

  const CheckPwd = (e: string) => {
    const num = e.search(/[0-9]/g);
    const eng = e.search(/[a-z]/gi);
    const spe = e.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
    if (case4Ref.current !== null) {
      if (e.length < 10 || e.length > 20) {
        case4Ref.current.className = 'case no';
      } else if (e.search(/\s/) !== -1) {
        case4Ref.current.className = 'case no';
      } else {
        case4Ref.current.className = 'case ok';
      }
    }

    if (case3Ref.current !== null) {
      if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
        case3Ref.current.className = 'case no';
      } else {
        case3Ref.current.className = 'case ok';
      }
    }
  };

  const ReCheckPwd = (e: string) => {
    if (password !== e && case5Ref.current !== null) {
      case5Ref.current.className = 'case no';
    } else if (password === e && case5Ref.current !== null) {
      case5Ref.current.className = 'case ok';
    }
  };
  const dispatch = useDispatch();
  const submitJoinButton = () => dispatch(SIGN_UP_REQUEST({ email, username, password }));
  return (
    <div className="login-container">
      <div className="join-box login-box">
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
        <span className="spanText">회원가입</span>
        <form className="JoinForm">
          {/* 이메일 */}
          <button type="button" className="sendEmailBtn">
            인증발송
          </button>
          <input value={email} type="text" placeholder="이메일을 입력하세요" onChange={setEmail} />
          <button type="button" className="sendEmailBtn">
            확인
          </button>
          <input type="text" placeholder="인증번호확인" />
          {/* 이메일 */}

          {/* 아이디 */}
          <button type="button" className="sendEmailBtn">
            중복확인
          </button>
          <input
            value={username}
            type="text"
            name="username"
            placeholder="아이디를 입력하세요"
            onFocus={onFocusDisplay}
            onChange={(e) => {
              CheckId(e.target.value);
              setUsername(e);
            }}
          />
          <div className="focusInputOn" style={hiddenIdStyle}>
            <p ref={case1Ref} className="case">
              4자 이상의 영문 혹은 영문과 숫자를 조합
            </p>
            <p ref={case2Ref} className="case">
              아이디 중복확인
            </p>
          </div>
          {/* 아이디 */}

          {/* 비밀번호 */}
          <input
            style={{ width: '298px' }}
            name="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            onFocus={onFocusDisplay}
            onChange={(e) => {
              CheckPwd(e.target.value);
              setPassword(e);
            }}
          />
          <div className="focusInputOn" style={hiddenPwdStyle}>
            <p ref={case3Ref} className="case">
              영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력
            </p>
            <p ref={case4Ref} className="case">
              10자리 ~ 20자리 이내로 공백없이 입력
            </p>
          </div>
          <input
            style={{ width: '298px' }}
            type="password"
            placeholder="비밀번호를 한번 더 입력해주세요"
            onChange={(e) => ReCheckPwd(e.target.value)}
          />
          <div className="focusInputOn" style={hiddenPwdStyle}>
            <p ref={case5Ref} className="case">
              동일한 비밀번호 입력
            </p>
          </div>
          {/* 비밀번호 */}
          <button type="button" className="JoinLoign-button" onClick={submitJoinButton}>
            {loading ? <ButtonLoader /> : '회원가입'}
          </button>
        </form>
        <section className="social-box">
          <h4>소셜 계정으로 회원가입</h4>
          <div className="googlebox">
            <GoogleAPI />
          </div>
        </section>
        <div className="login-foot">
          <span className="spanText">이미 회원이신가요 ?</span>
          <div className="foot-link">
            <button type="button" onClick={changeAccountText}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
