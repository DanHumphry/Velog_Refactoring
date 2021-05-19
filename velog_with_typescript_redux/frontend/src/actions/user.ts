import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_IMG_REQUEST,
  UPDATE_PROFILE_IMG_FAILURE,
  UPDATE_PROFILE_IMG_SUCCESS,
} from '@reducers/user';

export const LOG_IN_REQUEST_ACTION = () => ({ type: LOG_IN_REQUEST });
export const LOG_IN_SUCCESS_ACTION = (data: { username: string; password: string }) => ({ type: LOG_IN_SUCCESS, data });
export const LOG_IN_FAILURE_ACTION = (error: Error | any) => ({ type: LOG_IN_FAILURE, data: error });

export const SIGN_UP_REQUEST_ACTION = (data: { email: string; username: string; password: string }) => ({
  type: SIGN_UP_REQUEST,
  data,
});
export const SIGN_UP_SUCCESS_ACTION = () => ({ type: SIGN_UP_SUCCESS });
export const SIGN_UP_FAILURE_ACTION = (error: Error | any) => ({ type: SIGN_UP_FAILURE, data: error });

export const UPDATE_PROFILE_REQUEST_ACTION = () => ({ type: UPDATE_PROFILE_REQUEST });
export const UPDATE_PROFILE_SUCCESS_ACTION = (data: any) => ({ type: UPDATE_PROFILE_SUCCESS, data });
export const UPDATE_PROFILE_FAILURE_ACTION = (error: Error | any) => ({ type: UPDATE_PROFILE_FAILURE, data: error });

export const UPDATE_PROFILE_IMG_REQUEST_ACTION = () => ({ type: UPDATE_PROFILE_IMG_REQUEST });
export const UPDATE_PROFILE_IMG_SUCCESS_ACTION = (data: any) => ({ type: UPDATE_PROFILE_IMG_SUCCESS, data });
export const UPDATE_PROFILE_IMG_FAILURE_ACTION = (error: Error | any) => ({
  type: UPDATE_PROFILE_IMG_FAILURE,
  data: error,
});
