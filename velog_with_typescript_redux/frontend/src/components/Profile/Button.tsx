import React from 'react';
import { DELETE_USER_REQUEST } from '@thunks/user';
import { useDispatch } from 'react-redux';
import { me } from '@typings/db';
import { useHistory } from 'react-router';

interface Props {
  me: me;
}

function Button({ me }: Props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const delUser = async () => {
    if (me.id) {
      if (window.confirm('정말 삭제하시겠습니까 ?')) {
        dispatch(DELETE_USER_REQUEST({ userId: me.id }));
        history.push('/');
      }
    } else alert('권한이 없습니다.');
  };

  return (
    <div className="myProfile">
      <div className="wrapper">
        <div className="title-wrapper" />
        <div className="block-for-mobile">
          <div className="contents">
            <button className="out-button" type="button" onClick={delUser}>
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Button;
