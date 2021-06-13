import myFunctions from '@hooks/myFunctions';
import React, { useState } from 'react';
import useInput from '@hooks/useInput';

interface Props {
  me: {
    id: number;
    email: string;
    nickname: string;
    git: string;
    profileImg: string;
    myIntroduce: string;
  };
}

function Introduce({ me }: Props) {
  const [infoModal, setInfoModal] = useState(false);
  const [info, setInfo, resetInfo] = useInput('');
  const [infoLength, setInfoLength] = useState<number>(0);

  const { updateProfile, limitLengthOnKeyUpEvent } = myFunctions();

  return (
    <div className="profile-info">
      {infoModal === true ? (
        <>
          <form>
            <textarea
              value={info}
              name="myInfo"
              placeholder={me.myIntroduce}
              onChange={setInfo}
              onKeyUp={(e) => limitLengthOnKeyUpEvent(e, resetInfo, setInfoLength, 120)}
            />
            <div className="info_maxLength">
              <p>{infoLength} / 120</p>
            </div>
          </form>
          <button
            type="button"
            className="myInfoButton"
            name="myInfo"
            onClick={() => updateProfile({ ...me, myIntroduce: info }, setInfoModal)}
          >
            저장
          </button>
        </>
      ) : (
        <>
          {me.myIntroduce?.split('\n').map((line: string, idx: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <h2 key={idx}>
              {line}
              <br />
            </h2>
          ))}
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
}
export default Introduce;
