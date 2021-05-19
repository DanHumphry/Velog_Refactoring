import { usernameCheckAPI } from '@api/user';
import useInput from '@hooks/useInput';
import React, { useRef, useState } from 'react';

const JoinUsernameSection = () => {
  const case1Ref = useRef<HTMLParagraphElement | null>(null);
  const case2Ref = useRef<HTMLParagraphElement | null>(null);

  const [username, setUsername] = useInput('');

  const [caseStyle, setCaseStyle] = useState({ display: 'none' });
  const onFocusDisplay = () => setCaseStyle({ display: 'block' });

  const CheckId = (e: string) => {
    const regex = /^[a-z0-9]{4,20}$/;
    if (regex.test(e) === false) {
      if (case1Ref.current?.className === 'case' || case1Ref.current?.className === 'case ok') {
        case1Ref.current.className = 'case no';
      }
    } else if (case1Ref.current?.className === 'case' || case1Ref.current?.className === 'case no') {
      case1Ref.current.className = 'case ok';
    }

    if (case2Ref.current?.className === 'case ok') {
      case2Ref.current.className = 'case no';
    }
  };

  const checkUsername = async () => {
    try {
      const res = await usernameCheckAPI({ username });
      if (res.data && case2Ref.current !== null) {
        case2Ref.current.className = 'case ok';
        alert('사용가능한 아이디 입니다.');
      }
    } catch (error) {
      if (case2Ref.current !== null) {
        case2Ref.current.className = 'case no';
        alert('이미 존재하는 아이디 입니다.');
      }
      console.log(error);
    }
  };

  return (
    <>
      <button type="button" className="sendEmailBtn" onClick={checkUsername}>
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
      <div className="focusInputOn" style={caseStyle}>
        <p ref={case1Ref} className="case">
          4자 이상의 영문 혹은 영문과 숫자를 조합
        </p>
        <p ref={case2Ref} className="case">
          아이디 중복확인
        </p>
      </div>
    </>
  );
};
export default React.memo(JoinUsernameSection);
