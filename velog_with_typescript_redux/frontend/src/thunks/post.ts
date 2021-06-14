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
  LOAD_FILTER_LIST_FAILURE_ACTION,
  LOAD_FILTER_LIST_REQUEST_ACTION,
  LOAD_FILTER_LIST_SUCCESS_ACTION,
  LOAD_FILTERED_POSTS_FAILURE_ACTION,
  LOAD_FILTERED_POSTS_REQUEST_ACTION,
  LOAD_FILTERED_POSTS_SUCCESS_ACTION,
  LOAD_SCROLL_EVENT_FILTERED_POSTS_FAILURE_ACTION,
  LOAD_SCROLL_EVENT_FILTERED_POSTS_REQUEST_ACTION,
  LOAD_SCROLL_EVENT_FILTERED_POSTS_SUCCESS_ACTION,
  LOAD_SERIES_POSTS_FAILURE_ACTION,
  LOAD_SERIES_POSTS_REQUEST_ACTION,
  LOAD_SERIES_POSTS_SUCCESS_ACTION,
  LOAD_SERIES_LIST_FAILURE_ACTION,
  LOAD_SERIES_LIST_REQUEST_ACTION,
  LOAD_SERIES_LIST_SUCCESS_ACTION,
  LOAD_LIKED_FILTERED_POSTS_FAILURE_ACTION,
  LOAD_LIKED_FILTERED_POSTS_REQUEST_ACTION,
  LOAD_LIKED_FILTERED_POSTS_SUCCESS_ACTION,
} from '@actions/post';
import * as postAPI from '@api/post';

/* eslint-disable */

export const ADD_POST_REQUEST = (v: FormData) => async (dispatch: any) => {
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

export const LOAD_LIKED_POSTS_REQUEST = (data: { lastId: number | null; tagList: number[] | null }) => async (
  dispatch: any,
) => {
  try {
    dispatch(LOAD_LIKED_POSTS_REQUEST_ACTION());
    const res = await postAPI.loadLikedPostsAPI(data);
    dispatch(LOAD_LIKED_POSTS_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_LIKED_POSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_MYPOSTS_REQUEST = (data: { userId: number; lastId: number | null }) => async (dispatch: any) => {
  try {
    dispatch(LOAD_MYPOSTS_REQUEST_ACTION());
    const res = await postAPI.loadMyPostsAPI(data);
    dispatch(LOAD_MYPOSTS_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_MYPOSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_LIKED_MYPOSTS_REQUEST = (data: { userId: number; lastIdx: number | null }) => async (
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

export const LOAD_POST_REQUEST = (data: { postId: number }) => async (dispatch: any) => {
  try {
    dispatch(LOAD_POST_REQUEST_ACTION());
    const res = await postAPI.loadPostAPI(data);
    dispatch(LOAD_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(LOAD_POST_FAILURE_ACTION(error.response.data));
  }
};

export const UPDATE_POST_REQUEST = (data: { postId: number; data: FormData }) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_POST_REQUEST_ACTION());
    const res = await postAPI.updatePostAPI(data);
    dispatch(UPDATE_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UPDATE_POST_FAILURE_ACTION(error.response.data));
  }
};

export const REMOVE_POST_REQUEST = (data: { postId: number }) => async (dispatch: any) => {
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

export const ADD_POST_COMMENT_REQUEST = (data: { content: string; postId: number; userId: number }) => async (
  dispatch: any,
) => {
  try {
    dispatch(ADD_POST_COMMENT_REQUEST_ACTION());
    const res = await postAPI.PostCommentAPI(data);
    dispatch(ADD_POST_COMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(ADD_POST_COMMENT_FAILURE_ACTION(error.response.data));
  }
};

export const UPDATE_POST_COMMENT_REQUEST = (data: { content: string; commentId: number }) => async (dispatch: any) => {
  try {
    dispatch(UPDATE_POST_COMMENT_REQUEST_ACTION());
    const res = await postAPI.updateCommentAPI(data);
    dispatch(UPDATE_POST_COMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UPDATE_POST_COMMENT_FAILURE_ACTION(error.response.data));
  }
};
export const REMOVE_POST_COMMENT_REQUEST = (data: { writtenUser: number; commentId: number }) => async (
  dispatch: any,
) => {
  try {
    dispatch(REMOVE_POST_COMMENT_REQUEST_ACTION());
    const res = await postAPI.removeCommentAPI(data);
    dispatch(REMOVE_POST_COMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(REMOVE_POST_COMMENT_FAILURE_ACTION(error.response.data));
  }
};

export const ADD_POST_RECOMMENT_REQUEST = (data: { content: string; userId: number; commentId: number }) => async (
  dispatch: any,
) => {
  try {
    dispatch(ADD_POST_RECOMMENT_REQUEST_ACTION());
    const res = await postAPI.PostReCommentAPI(data);
    dispatch(ADD_POST_RECOMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(ADD_POST_RECOMMENT_FAILURE_ACTION(error.response.data));
  }
};

export const UPDATE_POST_RECOMMENT_REQUEST = (data: { content: string; reCommentId: number }) => async (
  dispatch: any,
) => {
  try {
    dispatch(UPDATE_POST_RECOMMENT_REQUEST_ACTION());
    const res = await postAPI.updateReCommentAPI(data);
    dispatch(UPDATE_POST_RECOMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(UPDATE_POST_RECOMMENT_FAILURE_ACTION(error.response.data));
  }
};
export const REMOVE_POST_RECOMMENT_REQUEST = (data: { writtenUser: number; reCommentId: number }) => async (
  dispatch: any,
) => {
  try {
    dispatch(REMOVE_POST_RECOMMENT_REQUEST_ACTION());
    const res = await postAPI.removeReCommentAPI(data);
    dispatch(REMOVE_POST_RECOMMENT_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(REMOVE_POST_RECOMMENT_FAILURE_ACTION(error.response.data));
  }
};
export const LOAD_FILTER_LIST_REQUEST = () => async (dispatch: any) => {
  try {
    dispatch(LOAD_FILTER_LIST_REQUEST_ACTION());
    const res = await postAPI.loadFilterList();
    dispatch(LOAD_FILTER_LIST_SUCCESS_ACTION(res));
  } catch (error) {
    dispatch(LOAD_FILTER_LIST_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_FILTERED_POSTS_REQUEST = (data: { tagList: number[] }) => async (dispatch: any) => {
  try {
    dispatch(LOAD_FILTERED_POSTS_REQUEST_ACTION());
    const res = await postAPI.loadFilteredPosts(data);
    dispatch(LOAD_FILTERED_POSTS_SUCCESS_ACTION(res));
  } catch (error) {
    dispatch(LOAD_FILTERED_POSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_SCROLL_EVENT_FILTERED_POSTS_REQUEST = (data: { tagList: number[]; lastId: number }) => async (
  dispatch: any,
) => {
  try {
    dispatch(LOAD_SCROLL_EVENT_FILTERED_POSTS_REQUEST_ACTION());
    const res = await postAPI.loadScrollEventFilteredPosts(data);
    dispatch(LOAD_SCROLL_EVENT_FILTERED_POSTS_SUCCESS_ACTION(res));
  } catch (error) {
    dispatch(LOAD_SCROLL_EVENT_FILTERED_POSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_SERIES_POSTS_REQUEST = (data: { userId: number }) => async (dispatch: any) => {
  try {
    dispatch(LOAD_SERIES_POSTS_REQUEST_ACTION());
    const res = await postAPI.loadMyPostsInSeries(data);
    dispatch(LOAD_SERIES_POSTS_SUCCESS_ACTION(res));
  } catch (error) {
    dispatch(LOAD_SERIES_POSTS_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_SERIES_LIST_REQUEST = (data: { userId: number }) => async (dispatch: any) => {
  try {
    dispatch(LOAD_SERIES_LIST_REQUEST_ACTION());
    const res = await postAPI.loadSeriesList(data);
    dispatch(LOAD_SERIES_LIST_SUCCESS_ACTION(res));
  } catch (error) {
    dispatch(LOAD_SERIES_LIST_FAILURE_ACTION(error.response.data));
  }
};

export const LOAD_LIKED_FILTERED_POSTS_REQUEST = (data: { lastId: number | null; tagList: number[] | null }) => async (
  dispatch: any,
) => {
  try {
    dispatch(LOAD_LIKED_FILTERED_POSTS_REQUEST_ACTION());
    const res = await postAPI.loadLikedPostsAPI(data);
    dispatch(LOAD_LIKED_FILTERED_POSTS_SUCCESS_ACTION(res));
  } catch (error) {
    dispatch(LOAD_LIKED_FILTERED_POSTS_FAILURE_ACTION(error.response.data));
  }
};

/* eslint-enable */
