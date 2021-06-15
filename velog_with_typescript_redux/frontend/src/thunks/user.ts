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
  DELETE_USER_FAILURE_ACTION,
  DELETE_USER_REQUEST_ACTION,
  DELETE_USER_SUCCESS_ACTION,
} from '@actions/user';

import { me } from '@typings/db';

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
    return res.status;
  } catch (error) {
    dispatch(CHECK_EMAIL_FAILURE_ACTION(error.response.data));
    alert('이미 존재하는 이메일 입니다.');
    return error;
  }
};

export const SEND_EMAIL_REQUEST = (data: { email: string; number: number }) => async (dispatch: any) => {
  try {
    await dispatch(SEND_EMAIL_REQUEST_ACTION());
    await userAPI.sendEmailAPI(data);
    await dispatch(SEND_EMAIL_SUCCESS_ACTION());
  } catch (error) {
    dispatch(SEND_EMAIL_FAILURE_ACTION(error.response.data));
  }
};

export const LOG_OUT_REQUEST = () => async (dispatch: any) => {
  try {
    dispatch(LOG_OUT_REQUEST_ACTION());
    await userAPI.logOutAPI();
    await dispatch(LOG_OUT_SUCCESS_ACTION());
  } catch (error) {
    dispatch(LOG_OUT_FAILURE_ACTION(error.response.data));
  }
};

export const UPDATE_PROFILE_REQUEST = (v: me) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_PROFILE_REQUEST_ACTION());
    const res = await userAPI.updateProfileAPI(v);
    await dispatch(UPDATE_PROFILE_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UPDATE_PROFILE_FAILURE_ACTION(error.response.data));
  }
};

export const UPDATE_PROFILE_IMG_REQUEST = (v: FormData) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_PROFILE_IMG_REQUEST_ACTION());
    const res = await userAPI.updateProfileImgAPI(v);
    await dispatch(UPDATE_PROFILE_IMG_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UPDATE_PROFILE_IMG_FAILURE_ACTION(error.response.data));
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

export const DELETE_USER_REQUEST = (data: { userId: number }) => async (dispatch: any) => {
  try {
    dispatch(DELETE_USER_REQUEST_ACTION());
    await userAPI.deleteUserAPI(data);
    dispatch(DELETE_USER_SUCCESS_ACTION());
  } catch (error) {
    console.log(error);
    dispatch(DELETE_USER_FAILURE_ACTION(error.response.data));
  }
};

/* eslint-enable */
