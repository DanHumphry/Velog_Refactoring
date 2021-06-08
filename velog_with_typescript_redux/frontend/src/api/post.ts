import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export const postWriteAPI = (data: any) => {
  return axios.post('post/', data);
};

export const loadPostsAPI = (lastId: number | null) => {
  return axios.post('posts/', { lastId });
};

export const loadLikedPostsAPI = (lastIdx: number | null) => {
  return axios.post('posts/liked', { lastIdx });
};

export const loadMyPostsAPI = (data: { userId: string; lastId: number | null }) => {
  return axios.post(`posts/${data.userId}`, data);
};

export const loadLikedMyPostsAPI = (data: { userId: string; lastIdx: number | null }) => {
  return axios.post(`posts/${data.userId}/liked`, data);
};

export const loadPostAPI = (data: { postId: string }) => {
  return axios.get(`post/${data.postId}`);
};

export const updatePostAPI = (data: { postId: string; data: any }) => {
  return axios.post(`post/${data.postId}/update`, data);
};

export const removePostAPI = (data: { postId: string }) => {
  return axios.delete(`post/${data.postId}/delete`);
};

export const likePostAPI = (data: { userId: number; postId: number }) => {
  return axios.patch(`post/${data.postId}/like`);
};

export const unlikePostAPI = (data: { userId: number; postId: number }) => {
  return axios.delete(`post/${data.postId}/like`);
};

export const PostCommentAPI = (data: any) => {
  return axios.post(`post/${data.postId}/comment`, data);
};

export const updateCommentAPI = (data: any) => {
  return axios.post(`post/${data.commentId}/comment/update`, data);
};

export const removeCommentAPI = (data: any) => {
  return axios.delete(`post/${data.commentId}/comment/delete`);
};

export const PostReCommentAPI = (data: any) => {
  return axios.post(`post/${data.commentId}/reComment`, data);
};

export const updateReCommentAPI = (data: any) => {
  return axios.post(`post/${data.reCommentId}/reComment/update`, data);
};

export const removeReCommentAPI = (data: any) => {
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

export const loadMyPostsInSeries = (data: { userId: string }) => {
  return axios.get(`posts/${data.userId}/series`);
};
