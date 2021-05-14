import useUpdateProfile from '@hooks/useUpdateProfile';
import React, { useEffect, useState, VFC } from 'react';
import useInput from '@hooks/useInput';

interface Props {
  me: any;
}

const Introduce: VFC<Props> = ({ me }) => {
  const [infoModal, setInfoModal] = useState(false);
  const [info, setInfo] = useInput(me.myInfo);
  const { updateMyProfile } = useUpdateProfile();

  useEffect(() => {
    setInfoModal(false);
  }, [me]);

  return (
    <div className="profile-info">
      {infoModal === true ? (
        <>
          <form>
            <textarea value={info} name="myInfo" placeholder={me.myInfo} onChange={setInfo} />
          </form>
          <button type="button" className="myInfoButton" name="myInfo" onClick={(e) => updateMyProfile(e, info)}>
            저장
          </button>
        </>
      ) : (
        <>
          <h2>{me.myInfo}</h2>
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
