import myFunctions from '@hooks/myFunctions';
import useInput from '@hooks/useInput';
import React, { useState } from 'react';
import { me } from '@typings/db';

interface Props {
  me: me;
}

function Nickname({ me }: Props) {
  const [nicknameModal, setNicknameModal] = useState(false);
  const [nickname, setNickname, resetNickname] = useInput('');
  const [nicknameLength, setNicknameLength] = useState(0);

  const { updateProfile, limitLengthOnKeyUpEvent } = myFunctions();

  return (
    <div className="myProfile">
      <div className="wrapper">
        <div className="title-wrapper">
          <h3>닉네임</h3>
        </div>
        <div className="block-for-mobile">
          {nicknameModal === true ? (
            <>
              <form className="nickname-form">
                <input
                  value={nickname}
                  className="nickname-input"
                  placeholder={me.nickname}
                  onChange={setNickname}
                  onKeyUp={(e) => limitLengthOnKeyUpEvent(e, resetNickname, setNicknameLength, 30)}
                />
                <div className="nickname_maxLength">
                  <p>{nicknameLength} / 30</p>
                </div>
              </form>
              <div className="edit-wrapper">
                <button
                  type="button"
                  className="save-button"
                  onClick={() => updateProfile({ ...me, nickname }, setNicknameModal)}
                >
                  저장
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="contents">{me.nickname}</div>
              <div className="edit-wrapper">
                <button
                  type="button"
                  className="fix-button"
                  onClick={() => {
                    setNicknameModal(!nicknameModal);
                  }}
                >
                  수정
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Nickname;
