import React, { useState } from 'react';
import gravatar from 'gravatar';
import { useDispatch } from 'react-redux';
import { UPDATE_PROFILE_IMG_REQUEST } from '@thunks/user';

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

function ProfileImg({ me }: Props) {
  const dispatch = useDispatch();
  const [imgURL, setImgURL] = useState<string>('');
  const [imgFile, setImgFile] = useState<null | File>(null);

  const viewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const reader = new FileReader();
    let file: any;
    if (e.target.files !== null) {
      // eslint-disable-next-line prefer-destructuring
      file = e.target.files[0];
      setImgFile(file);
    } else return;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result !== null && typeof reader.result === 'string') setImgURL(reader.result);
    };
  };

  const submitImg = async () => {
    const formData = new FormData();
    await formData.append('id', `${me.id}`);
    if (imgFile !== null) {
      await formData.append('image', imgFile);
    } else await formData.append('image', '');
    await dispatch(UPDATE_PROFILE_IMG_REQUEST(formData));
  };

  return (
    <div className="thumbnail__">
      {/* eslint-disable-next-line no-nested-ternary */}
      {imgURL !== '' ? (
        <img src={imgURL} alt="" />
      ) : me.profileImg === '' || me.profileImg === null || me.profileImg === undefined ? (
        <img src={gravatar.url(me.nickname, { s: '20px', d: 'retro' })} alt="" />
      ) : (
        <img src={me.profileImg} alt="" />
      )}
      <label htmlFor="file" className="img-up">
        <input type="file" id="file" accept=".jpg, .png, .jpeg, .gif" onChange={viewImg} />
        이미지 업로드
      </label>
      <button type="button" className="img-de" onClick={submitImg}>
        저장
      </button>
    </div>
  );
}
export default ProfileImg;
