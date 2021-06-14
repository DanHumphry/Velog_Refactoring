import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_IMG_REQUEST,
  UPDATE_PROFILE_IMG_FAILURE,
  UPDATE_PROFILE_IMG_SUCCESS,
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_FAILURE,
  CHECK_EMAIL_SUCCESS,
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_FAILURE,
  SEND_EMAIL_SUCCESS,
  SET_LOGIN_MODAL,
  SET_ACCOUNT_TEXT,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  DELETE_USER_REQUEST,
} from '@reducers/user';
import { AxiosResponse } from 'axios';

export const LOG_IN_REQUEST_ACTION = () => ({ type: LOG_IN_REQUEST });
export const LOG_IN_SUCCESS_ACTION = (data: { email: string; password: string }) => ({ type: LOG_IN_SUCCESS, data });
export const LOG_IN_FAILURE_ACTION = (error: Error | string) => ({ type: LOG_IN_FAILURE, data: error });

export const SIGN_UP_REQUEST_ACTION = (data: { email: string; password: string }) => ({
  type: SIGN_UP_REQUEST,
  data,
});
export const SIGN_UP_SUCCESS_ACTION = () => ({ type: SIGN_UP_SUCCESS });
export const SIGN_UP_FAILURE_ACTION = (error: Error | string) => ({ type: SIGN_UP_FAILURE, data: error });

export const LOG_OUT_REQUEST_ACTION = () => ({ type: LOG_OUT_REQUEST });
export const LOG_OUT_SUCCESS_ACTION = () => ({ type: LOG_OUT_SUCCESS });
export const LOG_OUT_FAILURE_ACTION = (error: Error | string) => ({ type: LOG_OUT_FAILURE, data: error });

export const CHECK_EMAIL_REQUEST_ACTION = () => ({ type: CHECK_EMAIL_REQUEST });
export const CHECK_EMAIL_SUCCESS_ACTION = () => ({ type: CHECK_EMAIL_SUCCESS });
export const CHECK_EMAIL_FAILURE_ACTION = (error: Error | string) => ({ type: CHECK_EMAIL_FAILURE, data: error });

export const SEND_EMAIL_REQUEST_ACTION = () => ({ type: SEND_EMAIL_REQUEST });
export const SEND_EMAIL_SUCCESS_ACTION = () => ({ type: SEND_EMAIL_SUCCESS });
export const SEND_EMAIL_FAILURE_ACTION = (error: Error | string) => ({ type: SEND_EMAIL_FAILURE, data: error });

export const UPDATE_PROFILE_REQUEST_ACTION = () => ({ type: UPDATE_PROFILE_REQUEST });
export const UPDATE_PROFILE_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: UPDATE_PROFILE_SUCCESS, data });
export const UPDATE_PROFILE_FAILURE_ACTION = (error: Error | string) => ({ type: UPDATE_PROFILE_FAILURE, data: error });

export const UPDATE_PROFILE_IMG_REQUEST_ACTION = () => ({ type: UPDATE_PROFILE_IMG_REQUEST });
export const UPDATE_PROFILE_IMG_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: UPDATE_PROFILE_IMG_SUCCESS, data });
export const UPDATE_PROFILE_IMG_FAILURE_ACTION = (error: Error | string) => ({
  type: UPDATE_PROFILE_IMG_FAILURE,
  data: error,
});

export const SET_LOGIN_MODAL_ACTION = (data: boolean) => ({ type: SET_LOGIN_MODAL, data });
export const SET_ACCOUNT_TEXT_ACTION = (data: boolean) => ({ type: SET_ACCOUNT_TEXT, data });

export const DELETE_USER_REQUEST_ACTION = () => ({ type: DELETE_USER_REQUEST });
export const DELETE_USER_SUCCESS_ACTION = () => ({ type: DELETE_USER_SUCCESS });
export const DELETE_USER_FAILURE_ACTION = (error: Error | string) => ({ type: DELETE_USER_FAILURE, data: error });
