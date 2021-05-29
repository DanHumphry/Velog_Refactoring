import {
  ADD_POST_REQUEST_ACTION,
  ADD_POST_FAILURE_ACTION,
  ADD_POST_SUCCESS_ACTION,
  LOAD_POSTS_FAILURE_ACTION,
  LOAD_POSTS_REQUEST_ACTION,
  LOAD_POSTS_SUCCESS_ACTION,
  LOAD_POST_FAILURE_ACTION,
  LOAD_POST_REQUEST_ACTION,
  LOAD_POST_SUCCESS_ACTION,
  UPDATE_POST_FAILURE_ACTION,
  UPDATE_POST_REQUEST_ACTION,
  UPDATE_POST_SUCCESS_ACTION,
  REMOVE_POST_FAILURE_ACTION,
  REMOVE_POST_REQUEST_ACTION,
  REMOVE_POST_SUCCESS_ACTION,
} from '@actions/post';
import * as postAPI from '@api/post';

export const ADD_POST_REQUEST = (v: any) => async (dispatch: any) => {
  try {
    dispatch(ADD_POST_REQUEST_ACTION());
    const res = await postAPI.postWriteAPI(v);
    dispatch(ADD_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(ADD_POST_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_POSTS_REQUEST = () => async (dispatch: any) => {
  try {
    dispatch(LOAD_POSTS_REQUEST_ACTION());
    const res = await postAPI.loadPostsAPI();
    dispatch(LOAD_POSTS_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_POSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_POST_REQUEST = (id: string) => async (dispatch: any) => {
  try {
    dispatch(LOAD_POST_REQUEST_ACTION());
    const res = await postAPI.loadPostAPI(id);
    dispatch(LOAD_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_POST_FAILURE_ACTION(error.response.data));
  }
};

export const UPDATE_POST_REQUEST = (id: string, v: any) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_POST_REQUEST_ACTION());
    const res = await postAPI.updatePostAPI(id, v);
    dispatch(UPDATE_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UPDATE_POST_FAILURE_ACTION(error.response.data));
  }
};

export const REMOVE_POST_REQUEST = (id: string) => async (dispatch: any) => {
  try {
    dispatch(REMOVE_POST_REQUEST_ACTION());
    const res = await postAPI.removePostAPI(id);
    dispatch(REMOVE_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(REMOVE_POST_FAILURE_ACTION(error.response.data));
  }
};
