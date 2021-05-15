import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '@reducers/index';
import { UPDATE_PROFILE_SUCCESS } from '@reducers/user';

export default function useUpdateProfile() {
  const dispatch = useDispatch();
  const { me } = useSelector((store: RootState) => store.user);
  const updateMyProfile = useCallback(
    (e, v) => {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        data: {
          ...me,
          [e.target.name]: v,
        },
      });
    },
    [me],
  );

  return { updateMyProfile };
}
