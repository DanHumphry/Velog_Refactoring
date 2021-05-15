import React, { useEffect, useState, VFC } from 'react';
import useInput from '@hooks/useInput';
import useUpdateProfile from '@hooks/useUpdateProfile';

interface Props {
  me: any;
}

const Nickname: VFC<Props> = ({ me }) => {
  const [nicknameModal, setNicknameModal] = useState(false);
  const [nick, setNick] = useInput(me.nickname);
  const { updateMyProfile } = useUpdateProfile();

  useEffect(() => {
    setNicknameModal(false);
  }, [me]);

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
                  value={nick}
                  name="nickname"
                  className="nickname-input"
                  placeholder={me.nickname}
                  onChange={setNick}
                />
              </form>
              <div className="edit-wrapper">
                <button type="button" className="save-button" name="nickname" onClick={(e) => updateMyProfile(e, nick)}>
                  저장
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="contents">{me.nickname}</div>
              <div className="edit-wrapper">
                <button type="button" className="fix-button" onClick={() => setNicknameModal(true)}>
                  수정
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Nickname;
