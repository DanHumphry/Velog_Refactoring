import * as userAPI from '@api/user';
import {
  LOG_IN_REQUEST_ACTION,
  LOG_IN_SUCCESS_ACTION,
  LOG_IN_FAILURE_ACTION,
  SIGN_UP_REQUEST_ACTION,
  SIGN_UP_SUCCESS_ACTION,
  SIGN_UP_FAILURE_ACTION,
  UPDATE_PROFILE_FAILURE_ACTION,
  UPDATE_PROFILE_REQUEST_ACTION,
  UPDATE_PROFILE_SUCCESS_ACTION,
  UPDATE_PROFILE_IMG_REQUEST_ACTION,
  UPDATE_PROFILE_IMG_FAILURE_ACTION,
  UPDATE_PROFILE_IMG_SUCCESS_ACTION,
  LOG_OUT_REQUEST_ACTION,
  LOG_OUT_SUCCESS_ACTION,
  LOG_OUT_FAILURE_ACTION,
} from '@actions/user';

export const LOG_IN_REQUEST = (v: { username: string; password: string }) => async (dispatch: any) => {
  try {
    dispatch(LOG_IN_REQUEST_ACTION());
    const res = await userAPI.logInAPI(v);
    dispatch(LOG_IN_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOG_IN_FAILURE_ACTION(error.response.data));
  }
};

export const SIGN_UP_REQUEST = (v: { email: string; username: string; password: string }) => async (dispatch: any) => {
  try {
    dispatch(SIGN_UP_REQUEST_ACTION(v));
    await userAPI.signUpAPI(v);
    await dispatch(SIGN_UP_SUCCESS_ACTION());
    await alert('환영합니다. 회원가입이 완료되었습니다!!');
    await LOG_IN_REQUEST(v);
  } catch (error) {
    dispatch(SIGN_UP_FAILURE_ACTION(error.response.data));
  }
};

export const LOG_OUT_REQUEST = () => async (dispatch: any) => {
  try {
    dispatch(LOG_OUT_REQUEST_ACTION());
    await userAPI.logOutAPI();
    await dispatch(LOG_OUT_SUCCESS_ACTION());
  } catch (e) {
    console.log(e);
    dispatch(LOG_OUT_FAILURE_ACTION(e));
  }
};

export const UPDATE_PROFILE_REQUEST = (v: any) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_PROFILE_REQUEST_ACTION());
    const res = await userAPI.updateProfileAPI(v);
    await dispatch(UPDATE_PROFILE_SUCCESS_ACTION(res.data));
  } catch (e) {
    console.log(e);
    dispatch(UPDATE_PROFILE_FAILURE_ACTION(e));
  }
};

export const UPDATE_PROFILE_IMG_REQUEST = (v: FormData) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_PROFILE_IMG_REQUEST_ACTION());
    const res = await userAPI.updateProfileImgAPI(v);
    await dispatch(UPDATE_PROFILE_IMG_SUCCESS_ACTION(res.data));
  } catch (e) {
    console.log(e);
    dispatch(UPDATE_PROFILE_IMG_FAILURE_ACTION(e));
  }
};
