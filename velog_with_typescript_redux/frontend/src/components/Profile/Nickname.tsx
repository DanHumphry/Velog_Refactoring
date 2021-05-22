import useInput from '@hooks/useInput';
import { RootState } from '@reducers/index';
import { UPDATE_PROFILE_REQUEST } from '@thunks/user';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Nickname = () => {
  const { me } = useSelector((store: RootState) => store.user);

  const [nicknameModal, setNicknameModal] = useState(false);
  const [nickname, setNickname] = useInput(me.nickanme);

  const dispatch = useDispatch();

  const submit = async () => {
    await dispatch(UPDATE_PROFILE_REQUEST({ ...me, nickname }));
    await setNicknameModal(false);
  };

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
                <input className="nickname-input" placeholder={me.nickname} onChange={setNickname} />
              </form>
              <div className="edit-wrapper">
                <button type="button" className="save-button" onClick={submit}>
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
};
export default Nickname;
