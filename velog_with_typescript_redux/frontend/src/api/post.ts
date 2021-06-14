import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export const postWriteAPI = (data: FormData) => {
  return axios.post('post/', data);
};

export const loadPostsAPI = (lastId: number | null) => {
  return axios.post('posts/', { lastId });
};

export const loadLikedPostsAPI = (data: { lastId: number | null; tagList: number[] | null }) => {
  return axios.post('posts/liked', data);
};

export const loadMyPostsAPI = (data: { userId: number; lastId: number | null }) => {
  return axios.post(`posts/${data.userId}`, data);
};

export const loadLikedMyPostsAPI = (data: { userId: number; lastIdx: number | null }) => {
  return axios.post(`posts/${data.userId}/liked`, data);
};

export const loadPostAPI = (data: { postId: number }) => {
  return axios.get(`post/${data.postId}`);
};

export const updatePostAPI = (data: { postId: number; data: FormData }) => {
  return axios.post(`post/${data.postId}/update`, data.data);
};

export const removePostAPI = (data: { postId: number }) => {
  return axios.delete(`post/${data.postId}/delete`);
};

export const likePostAPI = (data: { userId: number; postId: number }) => {
  return axios.patch(`post/${data.postId}/like`);
};

export const unlikePostAPI = (data: { userId: number; postId: number }) => {
  return axios.delete(`post/${data.postId}/like`);
};

export const PostCommentAPI = (data: { content: string; postId: number; userId: number }) => {
  return axios.post(`post/${data.postId}/comment`, data);
};

export const updateCommentAPI = (data: { content: string; commentId: number }) => {
  return axios.post(`post/${data.commentId}/comment/update`, data);
};

export const removeCommentAPI = (data: { writtenUser: number; commentId: number }) => {
  return axios.delete(`post/${data.commentId}/comment/delete`);
};

export const PostReCommentAPI = (data: { content: string; userId: number; commentId: number }) => {
  return axios.post(`post/${data.commentId}/reComment`, data);
};

export const updateReCommentAPI = (data: { content: string; reCommentId: number }) => {
  return axios.post(`post/${data.reCommentId}/reComment/update`, data);
};

export const removeReCommentAPI = (data: { writtenUser: number; reCommentId: number }) => {
  return axios.delete(`post/${data.reCommentId}/reComment/delete`);
};

export const loadFilterList = () => {
  return axios.get(`posts/tags`);
};

export const loadFilteredPosts = (data: { tagList: number[] }) => {
  return axios.post(`posts/tags/filter`, data);
};

export const loadScrollEventFilteredPosts = (data: { tagList: number[]; lastId: number }) => {
  return axios.post(`posts/tags/filter/scroll`, data);
};

export const loadMyPostsInSeries = (data: { userId: number }) => {
  return axios.get(`posts/${data.userId}/series`);
};

export const loadSeriesList = (data: { userId: number }) => {
  return axios.get(`post/${data.userId}/seriesList`);
};
