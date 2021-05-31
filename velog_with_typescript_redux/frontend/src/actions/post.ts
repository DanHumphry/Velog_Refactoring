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
  LIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  LIKE_POST_REQUEST,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_REQUEST,
  UPDATE_COMMENT_FAILURE,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  ADD_RECOMMENT_FAILURE,
  ADD_RECOMMENT_REQUEST,
  ADD_RECOMMENT_SUCCESS,
  UPDATE_RECOMMENT_SUCCESS,
  UPDATE_RECOMMENT_FAILURE,
  UPDATE_RECOMMENT_REQUEST,
  REMOVE_RECOMMENT_FAILURE,
  REMOVE_RECOMMENT_REQUEST,
  REMOVE_RECOMMENT_SUCCESS,
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

export const LIKE_POST_REQUEST_ACTION = () => ({ type: LIKE_POST_REQUEST });
export const LIKE_POST_SUCCESS_ACTION = (data: any) => ({ type: LIKE_POST_SUCCESS, data });
export const LIKE_POST_FAILURE_ACTION = (error: Error | any) => ({ type: LIKE_POST_FAILURE, data: error });

export const UNLIKE_POST_REQUEST_ACTION = () => ({ type: UNLIKE_POST_REQUEST });
export const UNLIKE_POST_SUCCESS_ACTION = (data: any) => ({ type: UNLIKE_POST_SUCCESS, data });
export const UNLIKE_POST_FAILURE_ACTION = (error: Error | any) => ({ type: UNLIKE_POST_FAILURE, data: error });

export const ADD_POST_COMMENT_REQUEST_ACTION = () => ({ type: ADD_COMMENT_REQUEST });
export const ADD_POST_COMMENT_SUCCESS_ACTION = (data: any) => ({ type: ADD_COMMENT_SUCCESS, data });
export const ADD_POST_COMMENT_FAILURE_ACTION = (error: Error | any) => ({ type: ADD_COMMENT_FAILURE, data: error });

export const UPDATE_POST_COMMENT_REQUEST_ACTION = () => ({ type: UPDATE_COMMENT_REQUEST });
export const UPDATE_POST_COMMENT_SUCCESS_ACTION = (data: any) => ({ type: UPDATE_COMMENT_SUCCESS, data });
export const UPDATE_POST_COMMENT_FAILURE_ACTION = (error: Error | any) => ({
  type: UPDATE_COMMENT_FAILURE,
  data: error,
});

export const REMOVE_POST_COMMENT_REQUEST_ACTION = () => ({ type: REMOVE_COMMENT_REQUEST });
export const REMOVE_POST_COMMENT_SUCCESS_ACTION = (data: any) => ({ type: REMOVE_COMMENT_SUCCESS, data });
export const REMOVE_POST_COMMENT_FAILURE_ACTION = (error: Error | any) => ({
  type: REMOVE_COMMENT_FAILURE,
  data: error,
});

export const ADD_POST_RECOMMENT_REQUEST_ACTION = () => ({ type: ADD_RECOMMENT_REQUEST });
export const ADD_POST_RECOMMENT_SUCCESS_ACTION = (data: any) => ({ type: ADD_RECOMMENT_SUCCESS, data });
export const ADD_POST_RECOMMENT_FAILURE_ACTION = (error: Error | any) => ({ type: ADD_RECOMMENT_FAILURE, data: error });

export const UPDATE_POST_RECOMMENT_REQUEST_ACTION = () => ({ type: UPDATE_RECOMMENT_REQUEST });
export const UPDATE_POST_RECOMMENT_SUCCESS_ACTION = (data: any) => ({ type: UPDATE_RECOMMENT_SUCCESS, data });
export const UPDATE_POST_RECOMMENT_FAILURE_ACTION = (error: Error | any) => ({
  type: UPDATE_RECOMMENT_FAILURE,
  data: error,
});

export const REMOVE_POST_RECOMMENT_REQUEST_ACTION = () => ({ type: REMOVE_RECOMMENT_REQUEST });
export const REMOVE_POST_RECOMMENT_SUCCESS_ACTION = (data: any) => ({ type: REMOVE_RECOMMENT_SUCCESS, data });
export const REMOVE_POST_RECOMMENT_FAILURE_ACTION = (error: Error | any) => ({
  type: REMOVE_RECOMMENT_FAILURE,
  data: error,
});
