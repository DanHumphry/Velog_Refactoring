import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '@reducers/index';
import { SET_LOGIN_MODAL, SET_ACCOUNT_TEXT } from '@reducers/user';
import { SET_POST_NAV_MODAL } from '@reducers/post';

export default function useSetModal() {
  const dispatch = useDispatch();
  const { loginModal, accountText } = useSelector((store: RootState) => store.user);
  const { myPostNavModal } = useSelector((store: RootState) => store.post);
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
  const closeSetModal = useCallback(() => {
    dispatch({
      type: SET_POST_NAV_MODAL,
      data: false,
    });
  }, [myPostNavModal]);

  return { showLoginModal, changeAccountText, closeSetModal };
}
