import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export const postWriteAPI = (data: any) => {
  return axios.post('post/', data);
};

export const loadPostsAPI = (href: string) => {
  return axios.post('posts/', { href });
};

export const loadPostAPI = (id: string) => {
  return axios.get(`post/${id}`);
};

export const updatePostAPI = (id: string, data: any) => {
  return axios.post(`post/${id}/update`, data);
};

export const removePostAPI = (id: string) => {
  return axios.delete(`post/${id}/delete`);
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
