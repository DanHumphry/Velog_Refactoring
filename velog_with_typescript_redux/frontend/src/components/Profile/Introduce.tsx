import { RootState } from '@reducers/index';
import { UPDATE_PROFILE_REQUEST } from '@thunks/user';
import React, { useState } from 'react';
import useInput from '@hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';

const Introduce = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((store: RootState) => store.user);

  const [infoModal, setInfoModal] = useState(false);
  const [info, setInfo] = useInput(me.myIntroduce || '');

  const submit = async () => {
    await dispatch(UPDATE_PROFILE_REQUEST({ ...me, myIntroduce: info }));
    await setInfoModal(false);
  };

  return (
    <div className="profile-info">
      {infoModal === true ? (
        <>
          <form>
            <textarea value={info} name="myInfo" placeholder={me.myIntroduce} onChange={setInfo} />
          </form>
          <button type="button" className="myInfoButton" name="myInfo" onClick={submit}>
            저장
          </button>
        </>
      ) : (
        <>
          <h2>{me.myIntroduce}</h2>
          <button
            type="button"
            className="fix-button"
            onClick={() => {
              setInfoModal(true);
            }}
          >
            자기소개 수정
          </button>
        </>
      )}
    </div>
  );
};
export default Introduce;
