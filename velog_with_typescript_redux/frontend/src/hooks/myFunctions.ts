import { LOAD_MYPOSTS_REQUEST, LOAD_POST_REQUEST } from '@thunks/post';
import { UPDATE_PROFILE_REQUEST } from '@thunks/user';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function myFunctions() {
  const dispatch = useDispatch();
  const history = useHistory();

  const loadPost = async (id: string) => {
    await dispatch(LOAD_POST_REQUEST({ postId: id }));
    history.push(`/detail/${id}`);
  };

  const loadMyPost = async (userId: string) => {
    await dispatch(LOAD_MYPOSTS_REQUEST({ userId }));
    history.push(`/myPost/${userId}`);
  };

  const updateProfile = async (data: { info: any; modal: any }) => {
    await dispatch(UPDATE_PROFILE_REQUEST(data.info));
    await data.modal(false);
  };

  return { loadPost, loadMyPost, updateProfile };
}
