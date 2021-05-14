import React, { VFC } from 'react';

interface Props {
  me: any;
}

const ProfileImg: VFC<Props> = ({ me }) => {
  return (
    <div className="thumbnail__">
      <img src={me.userPhoto} alt="" />
      <label htmlFor="file" className="img-up">
        <input type="file" id="file" accept=".jpg, .png, .jpeg, .gif" />
        이미지 업로드
      </label>
      <button type="button" className="img-de">
        저장
      </button>
    </div>
  );
};
export default ProfileImg;
