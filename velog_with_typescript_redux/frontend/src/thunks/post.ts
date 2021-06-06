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
  LIKE_POST_FAILURE_ACTION,
  LIKE_POST_REQUEST_ACTION,
  LIKE_POST_SUCCESS_ACTION,
  UNLIKE_POST_FAILURE_ACTION,
  UNLIKE_POST_REQUEST_ACTION,
  UNLIKE_POST_SUCCESS_ACTION,
  ADD_POST_COMMENT_FAILURE_ACTION,
  ADD_POST_COMMENT_REQUEST_ACTION,
  ADD_POST_COMMENT_SUCCESS_ACTION,
  ADD_POST_RECOMMENT_FAILURE_ACTION,
  ADD_POST_RECOMMENT_REQUEST_ACTION,
  ADD_POST_RECOMMENT_SUCCESS_ACTION,
  UPDATE_POST_COMMENT_REQUEST_ACTION,
  UPDATE_POST_COMMENT_SUCCESS_ACTION,
  UPDATE_POST_COMMENT_FAILURE_ACTION,
  REMOVE_POST_COMMENT_REQUEST_ACTION,
  REMOVE_POST_COMMENT_SUCCESS_ACTION,
  REMOVE_POST_COMMENT_FAILURE_ACTION,
  UPDATE_POST_RECOMMENT_FAILURE_ACTION,
  UPDATE_POST_RECOMMENT_REQUEST_ACTION,
  UPDATE_POST_RECOMMENT_SUCCESS_ACTION,
  REMOVE_POST_RECOMMENT_FAILURE_ACTION,
  REMOVE_POST_RECOMMENT_REQUEST_ACTION,
  REMOVE_POST_RECOMMENT_SUCCESS_ACTION,
  LOAD_MYPOSTS_FAILURE_ACTION,
  LOAD_MYPOSTS_REQUEST_ACTION,
  LOAD_MYPOSTS_SUCCESS_ACTION,
  LOAD_LIKED_MYPOSTS_FAILURE_ACTION,
  LOAD_LIKED_MYPOSTS_REQUEST_ACTION,
  LOAD_LIKED_MYPOSTS_SUCCESS_ACTION,
  LOAD_LIKED_POSTS_FAILURE_ACTION,
  LOAD_LIKED_POSTS_REQUEST_ACTION,
  LOAD_LIKED_POSTS_SUCCESS_ACTION,
} from '@actions/post';
import * as postAPI from '@api/post';

export const ADD_POST_REQUEST = (v: any) => async (dispatch: any) => {
  try {
    dispatch(ADD_POST_REQUEST_ACTION());
    const res = await postAPI.postWriteAPI(v);
    dispatch(ADD_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(ADD_POST_FAILURE_ACTION(error.response.data));
    alert(error.response.data);
  }
};

export const LOAD_POSTS_REQUEST = (lastId: number | null) => async (dispatch: any) => {
  try {
    dispatch(LOAD_POSTS_REQUEST_ACTION());
    const res = await postAPI.loadPostsAPI(lastId);
    dispatch(LOAD_POSTS_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_POSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_LIKED_POSTS_REQUEST = (lastId: number | null) => async (dispatch: any) => {
  try {
    dispatch(LOAD_LIKED_POSTS_REQUEST_ACTION());
    const res = await postAPI.loadLikedPostsAPI(lastId);
    dispatch(LOAD_LIKED_POSTS_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_LIKED_POSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_MYPOSTS_REQUEST = (data: { userId: string; lastId: number | null }) => async (dispatch: any) => {
  try {
    dispatch(LOAD_MYPOSTS_REQUEST_ACTION());
    const res = await postAPI.loadMyPostsAPI(data);
    dispatch(LOAD_MYPOSTS_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_MYPOSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_LIKED_MYPOSTS_REQUEST = (data: { userId: string; lastIdx: number | null }) => async (
  dispatch: any,
) => {
  try {
    dispatch(LOAD_LIKED_MYPOSTS_REQUEST_ACTION());
    const res = await postAPI.loadLikedMyPostsAPI(data);
    dispatch(LOAD_LIKED_MYPOSTS_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_LIKED_MYPOSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_POST_REQUEST = (data: { postId: string }) => async (dispatch: any) => {
  try {
    dispatch(LOAD_POST_REQUEST_ACTION());
    const res = await postAPI.loadPostAPI(data);
    dispatch(LOAD_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_POST_FAILURE_ACTION(error.response.data));
  }
};

export const UPDATE_POST_REQUEST = (data: { postId: string; data: any }) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_POST_REQUEST_ACTION());
    const res = await postAPI.updatePostAPI(data);
    dispatch(UPDATE_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UPDATE_POST_FAILURE_ACTION(error.response.data));
  }
};

export const REMOVE_POST_REQUEST = (data: { postId: string }) => async (dispatch: any) => {
  try {
    dispatch(REMOVE_POST_REQUEST_ACTION());
    const res = await postAPI.removePostAPI(data);
    dispatch(REMOVE_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(REMOVE_POST_FAILURE_ACTION(error.response.data));
  }
};

export const LIKE_POST_REQUEST = (data: { userId: number; postId: number }) => async (dispatch: any) => {
  try {
    dispatch(LIKE_POST_REQUEST_ACTION());
    const res = await postAPI.likePostAPI(data);
    dispatch(LIKE_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LIKE_POST_FAILURE_ACTION(error.response.data));
  }
};

export const UNLIKE_POST_REQUEST = (data: { userId: number; postId: number }) => async (dispatch: any) => {
  try {
    dispatch(UNLIKE_POST_REQUEST_ACTION());
    const res = await postAPI.unlikePostAPI(data);
    dispatch(UNLIKE_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UNLIKE_POST_FAILURE_ACTION(error.response.data));
  }
};

export const ADD_POST_COMMENT_REQUEST = (data: any) => async (dispatch: any) => {
  try {
    dispatch(ADD_POST_COMMENT_REQUEST_ACTION());
    const res = await postAPI.PostCommentAPI(data);
    dispatch(ADD_POST_COMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(ADD_POST_COMMENT_FAILURE_ACTION(error.response.data));
  }
};

export const UPDATE_POST_COMMENT_REQUEST = (data: any) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_POST_COMMENT_REQUEST_ACTION());
    const res = await postAPI.updateCommentAPI(data);
    dispatch(UPDATE_POST_COMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UPDATE_POST_COMMENT_FAILURE_ACTION(error.response.data));
  }
};
export const REMOVE_POST_COMMENT_REQUEST = (data: any) => async (dispatch: any) => {
  try {
    dispatch(REMOVE_POST_COMMENT_REQUEST_ACTION());
    const res = await postAPI.removeCommentAPI(data);
    dispatch(REMOVE_POST_COMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(REMOVE_POST_COMMENT_FAILURE_ACTION(error.response.data));
  }
};

export const ADD_POST_RECOMMENT_REQUEST = (data: any) => async (dispatch: any) => {
  try {
    dispatch(ADD_POST_RECOMMENT_REQUEST_ACTION());
    const res = await postAPI.PostReCommentAPI(data);
    dispatch(ADD_POST_RECOMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(ADD_POST_RECOMMENT_FAILURE_ACTION(error.response.data));
  }
};

export const UPDATE_POST_RECOMMENT_REQUEST = (data: any) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_POST_RECOMMENT_REQUEST_ACTION());
    const res = await postAPI.updateReCommentAPI(data);
    dispatch(UPDATE_POST_RECOMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UPDATE_POST_RECOMMENT_FAILURE_ACTION(error.response.data));
  }
};
export const REMOVE_POST_RECOMMENT_REQUEST = (data: any) => async (dispatch: any) => {
  try {
    dispatch(REMOVE_POST_RECOMMENT_REQUEST_ACTION());
    const res = await postAPI.removeReCommentAPI(data);
    dispatch(REMOVE_POST_RECOMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(REMOVE_POST_RECOMMENT_FAILURE_ACTION(error.response.data));
  }
};
