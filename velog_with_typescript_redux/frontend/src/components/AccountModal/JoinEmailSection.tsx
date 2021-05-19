import { sendEmailAPI } from '@api/user';
import useInput from '@hooks/useInput';
import React, { useEffect, useRef, useState } from 'react';

const JoinEmailSection = () => {
  const case6Ref = useRef<HTMLParagraphElement | null>(null);
  const [randNum, setRandNum] = useState<number | null>(null);
  const [valiNum, setValiNum] = useInput<number | string>('');

  const [email, setEmail] = useInput('');

  const [caseStyle, setCaseStyle] = useState({ display: 'none' });
  const onFocusDisplay = () => setCaseStyle({ display: 'block' });

  const sendEmail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const number = Math.floor(Math.random() * 100000);
    setRandNum(number);
    alert('발송되었습니다. 이메일을 확인해주세요.');
    sendEmailAPI({ email, number }).catch((error) => console.log(error));
  };

  const checkNum = () => {
    if (valiNum !== `${randNum}` && case6Ref.current !== null) {
      case6Ref.current.className = 'case no';
      alert('일치하지 않습니다. 인증번호를 다시 확인해주세요.');
    } else if (valiNum === `${randNum}` && case6Ref.current !== null) {
      case6Ref.current.className = 'case ok';
      alert('확인되었습니다.');
    }
  };

  return (
    <>
      <button type="button" className="sendEmailBtn" onClick={sendEmail}>
        인증발송
      </button>
      <input value={email} type="text" placeholder="이메일을 입력하세요" onChange={setEmail} />
      <button type="button" className="sendEmailBtn" onClick={checkNum}>
        확인
      </button>
      <input
        value={valiNum}
        type="text"
        name="email"
        placeholder="인증번호확인"
        onFocus={onFocusDisplay}
        onChange={setValiNum}
      />
      <div className="focusInputOn" style={caseStyle}>
        <p ref={case6Ref} className="case">
          인증번호 확인
        </p>
      </div>
    </>
  );
};
export default React.memo(JoinEmailSection);
