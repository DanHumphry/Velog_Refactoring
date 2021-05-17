import * as userAPI from '@api/user';
import {
  LOG_IN_REQUEST_ACTION,
  LOG_IN_SUCCESS_ACTION,
  LOG_IN_FAILURE_ACTION,
  SIGN_UP_REQUEST_ACTION,
  SIGN_UP_SUCCESS_ACTION,
  SIGN_UP_FAILURE_ACTION,
} from '@actions/user';

export const LOG_IN_REQUEST = (v: { username: string; password: string }) => async (dispatch: any) => {
  dispatch(LOG_IN_REQUEST_ACTION());

  try {
    const res = await userAPI.logInAPI(v);
    console.log(res);
    if (res.status === 200) {
      dispatch(LOG_IN_SUCCESS_ACTION(res.data));
    } else {
      dispatch(LOG_IN_FAILURE_ACTION(alert('일치하는 정보가 없습니다.')));
    }
  } catch (e) {
    dispatch(LOG_IN_FAILURE_ACTION(e));
  }
};

export const SIGN_UP_REQUEST = (v: { email: string; username: string; password: string }) => async (dispatch: any) => {
  try {
    dispatch(SIGN_UP_REQUEST_ACTION(v));

    const res = await userAPI.signUpAPI(v);
    if (res.data === 'ok') {
      await dispatch(SIGN_UP_SUCCESS_ACTION());
      await alert('환영합니다. 회원가입이 완료되었습니다!!');
      await LOG_IN_REQUEST(v);
    } else {
      dispatch(SIGN_UP_FAILURE_ACTION(res));
      console.log(res);
      alert('회원가입 실패 !!');
    }
  } catch (e) {
    // if (e.response.status === 403) {
    //   alert('이미 사용중인 아이디입니다.');
    // }
    dispatch(SIGN_UP_FAILURE_ACTION(e));
  }
};
