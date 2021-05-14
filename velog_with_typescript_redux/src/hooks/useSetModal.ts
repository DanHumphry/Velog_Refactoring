import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '@reducers/index';
import { SET_LOGIN_MODAL } from '@reducers/modal';

export default function useSetModal() {
  const dispatch = useDispatch();
  const { loginModal } = useSelector((store: RootState) => store.modal);
  const showLoginModal = useCallback(
    () =>
      dispatch({
        type: SET_LOGIN_MODAL,
        data: !loginModal,
      }),
    [loginModal],
  );

  return { showLoginModal };
}
