import useInput from '@hooks/useInput';
import React, { useRef, useState } from 'react';

function JoinPasswordSection() {
  const case3Ref = useRef<HTMLParagraphElement | null>(null);
  const case4Ref = useRef<HTMLParagraphElement | null>(null);
  const case5Ref = useRef<HTMLParagraphElement | null>(null);

  const [password, setPassword] = useInput('');

  const CheckPwd = (e: string) => {
    const num = e.search(/[0-9]/g);
    const eng = e.search(/[a-z]/gi);
    const spe = e.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (case4Ref.current !== null && case3Ref.current !== null) {
      const currentCase3ok = case3Ref.current.className === 'case' || case3Ref.current.className === 'case ok';
      const currentCase4ok = case4Ref.current.className === 'case' || case4Ref.current.className === 'case ok';
      const currentCase3no = case3Ref.current.className === 'case' || case3Ref.current.className === 'case no';
      const currentCase4no = case4Ref.current.className === 'case' || case4Ref.current.className === 'case no';

      if ((num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0)) {
        if (e.length < 10 || e.length > 20 || e.search(/\s/) !== -1) {
          // 혼합사용 하지 않은경우 + 10자리 미만 및 20자리 초과인 경우 => 둘다 no
          if (currentCase3ok || currentCase4ok) {
            case3Ref.current.className = 'case no';
            case4Ref.current.className = 'case no';
          }
        } else if (currentCase3ok || currentCase4no) {
          // 혼합사용 하지 않은경우 + 자리수도 10자리 이상 20자리 이하일때 => case3는 no, case4는 ok ,
          case3Ref.current.className = 'case no';
          case4Ref.current.className = 'case ok';
        }
      } else if (e.length < 10 || e.length > 20 || e.search(/\s/) !== -1) {
        // 2가지이상 혼합한 경우 + 10자리 미만 및 20자리 초과인 경우 => case3는 ok, case4는 no ,
        if (currentCase3no || currentCase4ok) {
          case3Ref.current.className = 'case ok';
          case4Ref.current.className = 'case no';
        }
      } else if (currentCase3no || currentCase4no) {
        // 2가지 이상 혼합한 경우 + 자리수도 10자리 이상 20자리 이하일때 => 둘다 ok
        case3Ref.current.className = 'case ok';
        case4Ref.current.className = 'case ok';
      }
    }
  };

  const ReCheckPwd = (e: string) => {
    if (password !== e && case5Ref.current !== null) {
      if (case5Ref.current.className === 'case' || case5Ref.current.className === 'case ok') {
        case5Ref.current.className = 'case no';
      }
    } else if (password === e && case5Ref.current !== null) {
      if (case5Ref.current.className === 'case' || case5Ref.current.className === 'case no') {
        case5Ref.current.className = 'case ok';
      }
    }
  };

  const [caseStyle, setCaseStyle] = useState({
    hiddenPwd: { display: 'none' },
    hiddenPwdCheck: { display: 'none' },
  });

  const onFocusDisplay = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.name === 'password') setCaseStyle({ ...caseStyle, hiddenPwd: { display: 'block' } });
    else setCaseStyle({ ...caseStyle, hiddenPwdCheck: { display: 'block' } });
  };

  return (
    <>
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
      <div className="focusInputOn" style={caseStyle.hiddenPwd}>
        <p ref={case3Ref} className="case">
          영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력
        </p>
        <p ref={case4Ref} className="case">
          10자리 ~ 20자리 이내로 공백없이 입력
        </p>
      </div>
      <input
        name="passwordCheck"
        style={{ width: '298px' }}
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요"
        onChange={(e) => ReCheckPwd(e.target.value)}
        onFocus={onFocusDisplay}
      />
      <div className="focusInputOn" style={caseStyle.hiddenPwdCheck}>
        <p ref={case5Ref} className="case">
          동일한 비밀번호 입력
        </p>
      </div>
    </>
  );
}
export default React.memo(JoinPasswordSection);
