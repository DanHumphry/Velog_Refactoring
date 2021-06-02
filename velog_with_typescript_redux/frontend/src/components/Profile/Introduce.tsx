import myFunctions from '@hooks/myFunctions';
import { UPDATE_PROFILE_REQUEST } from '@thunks/user';
import React, { useState } from 'react';
import useInput from '@hooks/useInput';
import { useDispatch } from 'react-redux';

interface Props {
  me: any;
}

const Introduce: React.VFC<Props> = ({ me }) => {
  const [infoModal, setInfoModal] = useState(false);
  const [info, setInfo] = useInput(me.myIntroduce || '');

  const { updateProfile } = myFunctions();

  return (
    <div className="profile-info">
      {infoModal === true ? (
        <>
          <form>
            <textarea value={info} name="myInfo" placeholder={me.myIntroduce} onChange={setInfo} />
          </form>
          <button
            type="button"
            className="myInfoButton"
            name="myInfo"
            onClick={() => updateProfile({ info: { ...me, myIntroduce: info }, modal: setInfoModal })}
          >
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
