import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '@reducers/index';
import { SET_LOGIN_MODAL, SET_PROFILE_MODAL } from '@reducers/modal';

export default function useSetModal() {
  const dispatch = useDispatch();
  const { loginModal, profileModal } = useSelector((store: RootState) => store.modal);
  const showLoginModal = useCallback(
    () =>
      dispatch({
        type: SET_LOGIN_MODAL,
        data: !loginModal,
      }),
    [loginModal],
  );
  const showProfileModal = useCallback(
    () =>
      dispatch({
        type: SET_PROFILE_MODAL,
        data: !profileModal,
      }),
    [profileModal],
  );

  return { showLoginModal, showProfileModal };
}
