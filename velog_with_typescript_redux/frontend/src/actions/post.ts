import {
  ADD_POST_REQUEST,
  ADD_POST_FAILURE,
  ADD_POST_SUCCESS,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_REQUEST,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_REQUEST,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from '@reducers/post';

export const ADD_POST_REQUEST_ACTION = () => ({ type: ADD_POST_REQUEST });
export const ADD_POST_SUCCESS_ACTION = (data: any) => ({ type: ADD_POST_SUCCESS, data });
export const ADD_POST_FAILURE_ACTION = (error: Error | any) => ({ type: ADD_POST_FAILURE, data: error });

export const LOAD_POSTS_REQUEST_ACTION = () => ({ type: LOAD_POSTS_REQUEST });
export const LOAD_POSTS_SUCCESS_ACTION = (data: any) => ({ type: LOAD_POSTS_SUCCESS, data });
export const LOAD_POSTS_FAILURE_ACTION = (error: Error | any) => ({ type: LOAD_POSTS_FAILURE, data: error });

export const LOAD_POST_REQUEST_ACTION = () => ({ type: LOAD_POST_REQUEST });
export const LOAD_POST_SUCCESS_ACTION = (data: any) => ({ type: LOAD_POST_SUCCESS, data });
export const LOAD_POST_FAILURE_ACTION = (error: Error | any) => ({ type: LOAD_POST_FAILURE, data: error });

export const UPDATE_POST_REQUEST_ACTION = () => ({ type: UPDATE_POST_REQUEST });
export const UPDATE_POST_SUCCESS_ACTION = (data: any) => ({ type: UPDATE_POST_SUCCESS, data });
export const UPDATE_POST_FAILURE_ACTION = (error: Error | any) => ({ type: UPDATE_POST_FAILURE, data: error });

export const REMOVE_POST_REQUEST_ACTION = () => ({ type: REMOVE_POST_REQUEST });
export const REMOVE_POST_SUCCESS_ACTION = (data: any) => ({ type: REMOVE_POST_SUCCESS, data });
export const REMOVE_POST_FAILURE_ACTION = (error: Error | any) => ({ type: REMOVE_POST_FAILURE, data: error });
