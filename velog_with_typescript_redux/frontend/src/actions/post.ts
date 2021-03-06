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
  LOAD_MYPOSTS_FAILURE,
  LOAD_MYPOSTS_SUCCESS,
  LOAD_MYPOSTS_REQUEST,
  LOAD_LIKED_POSTS_FAILURE,
  LOAD_LIKED_POSTS_SUCCESS,
  LOAD_LIKED_POSTS_REQUEST,
  LOAD_LIKED_MYPOSTS_FAILURE,
  LOAD_LIKED_MYPOSTS_REQUEST,
  LOAD_LIKED_MYPOSTS_SUCCESS,
  LOAD_FILTER_LIST_FAILURE,
  LOAD_FILTER_LIST_SUCCESS,
  LOAD_FILTER_LIST_REQUEST,
  LOAD_FILTERED_POSTS_FAILURE,
  LOAD_FILTERED_POSTS_SUCCESS,
  LOAD_FILTERED_POSTS_REQUEST,
  LOAD_SCROLL_EVENT_FILTERED_POSTS_FAILURE,
  LOAD_SCROLL_EVENT_FILTERED_POSTS_REQUEST,
  LOAD_SCROLL_EVENT_FILTERED_POSTS_SUCCESS,
  LOAD_SERIES_POSTS_FAILURE,
  LOAD_SERIES_POSTS_SUCCESS,
  LOAD_SERIES_POSTS_REQUEST,
  LOAD_SERIES_LIST_REQUEST,
  LOAD_SERIES_LIST_FAILURE,
  LOAD_SERIES_LIST_SUCCESS,
  LOAD_LIKED_FILTERED_POSTS_REQUEST,
  LOAD_LIKED_FILTERED_POSTS_FAILURE,
  LOAD_LIKED_FILTERED_POSTS_SUCCESS,
} from '@reducers/post';
import { AxiosResponse } from 'axios';

export const ADD_POST_REQUEST_ACTION = () => ({ type: ADD_POST_REQUEST });
export const ADD_POST_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: ADD_POST_SUCCESS, data });
export const ADD_POST_FAILURE_ACTION = (error: Error | string) => ({ type: ADD_POST_FAILURE, data: error });

export const LOAD_LIKED_MYPOSTS_REQUEST_ACTION = () => ({ type: LOAD_LIKED_MYPOSTS_REQUEST });
export const LOAD_LIKED_MYPOSTS_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: LOAD_LIKED_MYPOSTS_SUCCESS, data });
export const LOAD_LIKED_MYPOSTS_FAILURE_ACTION = (error: Error | string) => ({
  type: LOAD_LIKED_MYPOSTS_FAILURE,
  data: error,
});

export const LOAD_MYPOSTS_REQUEST_ACTION = () => ({ type: LOAD_MYPOSTS_REQUEST });
export const LOAD_MYPOSTS_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: LOAD_MYPOSTS_SUCCESS, data });
export const LOAD_MYPOSTS_FAILURE_ACTION = (error: Error | string) => ({ type: LOAD_MYPOSTS_FAILURE, data: error });

export const LOAD_LIKED_POSTS_REQUEST_ACTION = () => ({ type: LOAD_LIKED_POSTS_REQUEST });
export const LOAD_LIKED_POSTS_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: LOAD_LIKED_POSTS_SUCCESS, data });
export const LOAD_LIKED_POSTS_FAILURE_ACTION = (error: Error | string) => ({
  type: LOAD_LIKED_POSTS_FAILURE,
  data: error,
});

export const LOAD_POSTS_REQUEST_ACTION = () => ({ type: LOAD_POSTS_REQUEST });
export const LOAD_POSTS_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: LOAD_POSTS_SUCCESS, data });
export const LOAD_POSTS_FAILURE_ACTION = (error: Error | string) => ({ type: LOAD_POSTS_FAILURE, data: error });

export const LOAD_POST_REQUEST_ACTION = () => ({ type: LOAD_POST_REQUEST });
export const LOAD_POST_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: LOAD_POST_SUCCESS, data });
export const LOAD_POST_FAILURE_ACTION = (error: Error | string) => ({ type: LOAD_POST_FAILURE, data: error });

export const UPDATE_POST_REQUEST_ACTION = () => ({ type: UPDATE_POST_REQUEST });
export const UPDATE_POST_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: UPDATE_POST_SUCCESS, data });
export const UPDATE_POST_FAILURE_ACTION = (error: Error | string) => ({ type: UPDATE_POST_FAILURE, data: error });

export const REMOVE_POST_REQUEST_ACTION = () => ({ type: REMOVE_POST_REQUEST });
export const REMOVE_POST_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: REMOVE_POST_SUCCESS, data });
export const REMOVE_POST_FAILURE_ACTION = (error: Error | string) => ({ type: REMOVE_POST_FAILURE, data: error });

export const LIKE_POST_REQUEST_ACTION = () => ({ type: LIKE_POST_REQUEST });
export const LIKE_POST_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: LIKE_POST_SUCCESS, data });
export const LIKE_POST_FAILURE_ACTION = (error: Error | string) => ({ type: LIKE_POST_FAILURE, data: error });

export const UNLIKE_POST_REQUEST_ACTION = () => ({ type: UNLIKE_POST_REQUEST });
export const UNLIKE_POST_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: UNLIKE_POST_SUCCESS, data });
export const UNLIKE_POST_FAILURE_ACTION = (error: Error | string) => ({ type: UNLIKE_POST_FAILURE, data: error });

export const ADD_POST_COMMENT_REQUEST_ACTION = () => ({ type: ADD_COMMENT_REQUEST });
export const ADD_POST_COMMENT_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: ADD_COMMENT_SUCCESS, data });
export const ADD_POST_COMMENT_FAILURE_ACTION = (error: Error | string) => ({ type: ADD_COMMENT_FAILURE, data: error });

export const UPDATE_POST_COMMENT_REQUEST_ACTION = () => ({ type: UPDATE_COMMENT_REQUEST });
export const UPDATE_POST_COMMENT_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: UPDATE_COMMENT_SUCCESS, data });
export const UPDATE_POST_COMMENT_FAILURE_ACTION = (error: Error | string) => ({
  type: UPDATE_COMMENT_FAILURE,
  data: error,
});

export const REMOVE_POST_COMMENT_REQUEST_ACTION = () => ({ type: REMOVE_COMMENT_REQUEST });
export const REMOVE_POST_COMMENT_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: REMOVE_COMMENT_SUCCESS, data });
export const REMOVE_POST_COMMENT_FAILURE_ACTION = (error: Error | string) => ({
  type: REMOVE_COMMENT_FAILURE,
  data: error,
});

export const ADD_POST_RECOMMENT_REQUEST_ACTION = () => ({ type: ADD_RECOMMENT_REQUEST });
export const ADD_POST_RECOMMENT_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: ADD_RECOMMENT_SUCCESS, data });
export const ADD_POST_RECOMMENT_FAILURE_ACTION = (error: Error | string) => ({
  type: ADD_RECOMMENT_FAILURE,
  data: error,
});

export const UPDATE_POST_RECOMMENT_REQUEST_ACTION = () => ({ type: UPDATE_RECOMMENT_REQUEST });
export const UPDATE_POST_RECOMMENT_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: UPDATE_RECOMMENT_SUCCESS, data });
export const UPDATE_POST_RECOMMENT_FAILURE_ACTION = (error: Error | string) => ({
  type: UPDATE_RECOMMENT_FAILURE,
  data: error,
});

export const REMOVE_POST_RECOMMENT_REQUEST_ACTION = () => ({ type: REMOVE_RECOMMENT_REQUEST });
export const REMOVE_POST_RECOMMENT_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: REMOVE_RECOMMENT_SUCCESS, data });
export const REMOVE_POST_RECOMMENT_FAILURE_ACTION = (error: Error | string) => ({
  type: REMOVE_RECOMMENT_FAILURE,
  data: error,
});

export const LOAD_FILTER_LIST_REQUEST_ACTION = () => ({ type: LOAD_FILTER_LIST_REQUEST });
export const LOAD_FILTER_LIST_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: LOAD_FILTER_LIST_SUCCESS, data });
export const LOAD_FILTER_LIST_FAILURE_ACTION = (error: Error | string) => ({
  type: LOAD_FILTER_LIST_FAILURE,
  data: error,
});

export const LOAD_FILTERED_POSTS_REQUEST_ACTION = () => ({ type: LOAD_FILTERED_POSTS_REQUEST });
export const LOAD_FILTERED_POSTS_SUCCESS_ACTION = (data: AxiosResponse) => ({
  type: LOAD_FILTERED_POSTS_SUCCESS,
  data,
});
export const LOAD_FILTERED_POSTS_FAILURE_ACTION = (error: Error | string) => ({
  type: LOAD_FILTERED_POSTS_FAILURE,
  data: error,
});

export const LOAD_SCROLL_EVENT_FILTERED_POSTS_REQUEST_ACTION = () => ({
  type: LOAD_SCROLL_EVENT_FILTERED_POSTS_REQUEST,
});
export const LOAD_SCROLL_EVENT_FILTERED_POSTS_SUCCESS_ACTION = (data: AxiosResponse) => ({
  type: LOAD_SCROLL_EVENT_FILTERED_POSTS_SUCCESS,
  data,
});
export const LOAD_SCROLL_EVENT_FILTERED_POSTS_FAILURE_ACTION = (error: Error | string) => ({
  type: LOAD_SCROLL_EVENT_FILTERED_POSTS_FAILURE,
  data: error,
});

export const LOAD_SERIES_POSTS_REQUEST_ACTION = () => ({ type: LOAD_SERIES_POSTS_REQUEST });
export const LOAD_SERIES_POSTS_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: LOAD_SERIES_POSTS_SUCCESS, data });
export const LOAD_SERIES_POSTS_FAILURE_ACTION = (error: Error | string) => ({
  type: LOAD_SERIES_POSTS_FAILURE,
  data: error,
});

export const LOAD_SERIES_LIST_REQUEST_ACTION = () => ({ type: LOAD_SERIES_LIST_REQUEST });
export const LOAD_SERIES_LIST_SUCCESS_ACTION = (data: AxiosResponse) => ({ type: LOAD_SERIES_LIST_SUCCESS, data });
export const LOAD_SERIES_LIST_FAILURE_ACTION = (error: Error | string) => ({
  type: LOAD_SERIES_LIST_FAILURE,
  data: error,
});

export const LOAD_LIKED_FILTERED_POSTS_REQUEST_ACTION = () => ({ type: LOAD_LIKED_FILTERED_POSTS_REQUEST });
export const LOAD_LIKED_FILTERED_POSTS_SUCCESS_ACTION = (data: AxiosResponse) => ({
  type: LOAD_LIKED_FILTERED_POSTS_SUCCESS,
  data,
});
export const LOAD_LIKED_FILTERED_POSTS_FAILURE_ACTION = (error: Error | string) => ({
  type: LOAD_LIKED_FILTERED_POSTS_FAILURE,
  data: error,
});
