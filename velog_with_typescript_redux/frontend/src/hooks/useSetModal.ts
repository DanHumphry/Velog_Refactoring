import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '@reducers/index';
import { SET_LOGIN_MODAL, SET_ACCOUNT_TEXT } from '@reducers/user';

export default function useSetModal() {
  const dispatch = useDispatch();
  const { loginModal, accountText } = useSelector((store: RootState) => store.user);
  const showLoginModal = useCallback(
    () =>
      dispatch({
        type: SET_LOGIN_MODAL,
        data: !loginModal,
      }),
    [loginModal],
  );

  const changeAccountText = useCallback(
    () =>
      dispatch({
        type: SET_ACCOUNT_TEXT,
        data: !accountText,
      }),
    [accountText],
  );

  return { showLoginModal, changeAccountText };
}
