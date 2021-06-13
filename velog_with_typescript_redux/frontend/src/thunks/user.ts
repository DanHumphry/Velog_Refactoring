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
  CHECK_EMAIL_REQUEST_ACTION,
  CHECK_EMAIL_SUCCESS_ACTION,
  CHECK_EMAIL_FAILURE_ACTION,
  SEND_EMAIL_REQUEST_ACTION,
  SEND_EMAIL_FAILURE_ACTION,
  SEND_EMAIL_SUCCESS_ACTION,
  SET_LOGIN_MODAL_ACTION,
  SET_ACCOUNT_TEXT_ACTION,
} from '@actions/user';

/* eslint-disable */

export const LOG_IN_REQUEST = (v: { email: string; password: string }) => async (dispatch: any) => {
  try {
    dispatch(LOG_IN_REQUEST_ACTION());
    const res = await userAPI.logInAPI(v);
    dispatch(LOG_IN_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOG_IN_FAILURE_ACTION(error.response.data));
  }
};

export const SIGN_UP_REQUEST = (v: { email: string; password: string }) => async (dispatch: any) => {
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

export const CHECK_EMAIL_REQUEST = (v: { email: string }) => async (dispatch: any) => {
  try {
    dispatch(CHECK_EMAIL_REQUEST_ACTION());
    const res = await userAPI.emailCheckAPI(v);
    await dispatch(CHECK_EMAIL_SUCCESS_ACTION());
    alert('사용가능한 이메일 입니다.');
    return res;
  } catch (error) {
    dispatch(CHECK_EMAIL_FAILURE_ACTION(error));
    alert('이미 존재하는 이메일 입니다.');
    return error;
  }
};

export const SEND_EMAIL_REQUEST = (data: { email: string; number: number }) => async (dispatch: any) => {
  try {
    await dispatch(SEND_EMAIL_REQUEST_ACTION());
    await userAPI.sendEmailAPI(data);
    await dispatch(SEND_EMAIL_SUCCESS_ACTION());
    alert('발송완료되었습니다. 이메일을 확인해주세요.');
  } catch (error) {
    dispatch(SEND_EMAIL_FAILURE_ACTION(error));
    alert('발송에 실패했습니다. 이메일을 확인해주세요.');
  }
};

export const LOG_OUT_REQUEST = () => async (dispatch: any) => {
  try {
    dispatch(LOG_OUT_REQUEST_ACTION());
    await userAPI.logOutAPI();
    await dispatch(LOG_OUT_SUCCESS_ACTION());
  } catch (e) {
    dispatch(LOG_OUT_FAILURE_ACTION(e));
  }
};

export const UPDATE_PROFILE_REQUEST = (v: any) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_PROFILE_REQUEST_ACTION());
    const res = await userAPI.updateProfileAPI(v);
    await dispatch(UPDATE_PROFILE_SUCCESS_ACTION(res.data));
  } catch (e) {
    dispatch(UPDATE_PROFILE_FAILURE_ACTION(e));
  }
};

export const UPDATE_PROFILE_IMG_REQUEST = (v: FormData) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_PROFILE_IMG_REQUEST_ACTION());
    const res = await userAPI.updateProfileImgAPI(v);
    await dispatch(UPDATE_PROFILE_IMG_SUCCESS_ACTION(res.data));
  } catch (e) {
    dispatch(UPDATE_PROFILE_IMG_FAILURE_ACTION(e));
  }
};

export const SET_LOGIN_MODAL = (data: boolean) => async (dispatch: any) => {
  try {
    dispatch(SET_LOGIN_MODAL_ACTION(data));
  } catch (error) {
    console.log(error);
  }
};

export const SET_ACCOUNT_TEXT = (data: boolean) => async (dispatch: any) => {
  try {
    dispatch(SET_ACCOUNT_TEXT_ACTION(data));
  } catch (error) {
    console.log(error);
  }
};

/* eslint-enable */
