import useInput from '@hooks/useInput';
import { RootState } from '@reducers/index';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_EMAIL_REQUEST, SEND_EMAIL_REQUEST } from '@thunks/user';
import ButtonLoader from '@loader/ButtonLoader';

function JoinEmailSection() {
  const dispatch = useDispatch();
  const case6Ref = useRef<HTMLParagraphElement | null>(null);
  const case7Ref = useRef<HTMLParagraphElement | null>(null);
  const [randNum, setRandNum] = useState<number | null>(null);
  const [emailReadOnly, setEmailReadOnly] = useState(false);

  const [email, setEmail, resetEmail] = useInput('');

  const [caseStyle, setCaseStyle] = useState({
    hiddenEmail: { display: 'none' },
    hiddenValidation: { display: 'none' },
  });

  const { checkEmailLoading } = useSelector((store: RootState) => store.user);

  const onFocusDisplay = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'email') setCaseStyle({ ...caseStyle, hiddenEmail: { display: 'block' } });
    else setCaseStyle({ ...caseStyle, hiddenValidation: { display: 'block' } });
  };

  const sendEmail = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (case7Ref.current?.className === 'case ok') {
      const number = await Math.floor(Math.random() * 100000);
      setRandNum(number);
      try {
        dispatch(SEND_EMAIL_REQUEST({ email, number }));
        alert('발송되었습니다. 잠시후 확인해주세요.');
        setEmailReadOnly(true);
      } catch (error) {
        console.log(error);
        alert('발송에 실패했습니다. 이메일을 확인해주세요.');
      }
    } else if (case7Ref.current?.className === 'case no') alert('이미 사용중이거나, 사용할 수 없는 이메일입니다.');
    else alert('이메일의 중복확인을 먼저 해주세요.');
  };

  const checkNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== `${randNum}` && case6Ref.current !== null) {
      case6Ref.current.className = 'case no';
    } else if (e.target.value === `${randNum}` && case6Ref.current !== null) {
      case6Ref.current.className = 'case ok';
      alert('확인되었습니다.');
    }
  };

  const checkEmail = async () => {
    if (email === '' || email === null) {
      alert('이메일을 입력해주세요.');
    } else {
      try {
        const res: number | any = await dispatch(CHECK_EMAIL_REQUEST({ email }));
        if (res === 200 && case7Ref.current !== null) {
          case7Ref.current.className = 'case ok';
          setEmailReadOnly(true);
        } else if (case7Ref.current !== null) case7Ref.current.className = 'case no';
      } catch (e) {
        console.log(e);
      }
    }
  };

  const clearEmail = () => {
    setEmailReadOnly(false);
    setRandNum(null);
    resetEmail('');
    if (case7Ref.current !== null && case6Ref.current !== null) {
      case7Ref.current.className = 'case';
      case6Ref.current.className = 'case';
    }
  };

  return (
    <>
      <button type="button" className="sendEmailBtn" onClick={checkEmail}>
        {checkEmailLoading ? <ButtonLoader /> : '중복확인'}
      </button>
      {email !== '' ? (
        <svg viewBox="0 0 30 30" className="clearInput" onClick={clearEmail}>
          <path d="M15,0C6.716,0,0,6.716,0,15s6.716,15,15,15s15-6.716,15-15S23.284,0,15,0z M22,20.6L20.6,22L15,16.4L9.4,22L8,20.6l5.6-5.6 L8,9.4L9.4,8l5.6,5.6L20.6,8L22,9.4L16.4,15L22,20.6z" />
        </svg>
      ) : null}

      <input
        readOnly={emailReadOnly}
        value={email}
        type="email"
        name="email"
        placeholder="이메일을 입력하세요"
        onFocus={onFocusDisplay}
        onChange={setEmail}
      />
      <div className="focusInputOn" style={caseStyle.hiddenEmail}>
        <p ref={case7Ref} className="case">
          이메일 중복확인
        </p>
      </div>
      <button type="button" className="sendEmailBtn" onClick={sendEmail}>
        번호발송
      </button>
      <input type="text" placeholder="인증번호확인" onFocus={onFocusDisplay} onChange={checkNum} />
      <div className="focusInputOn" style={caseStyle.hiddenValidation}>
        <p ref={case6Ref} className="case">
          인증번호 확인
        </p>
      </div>
    </>
  );
}
export default React.memo(JoinEmailSection);
