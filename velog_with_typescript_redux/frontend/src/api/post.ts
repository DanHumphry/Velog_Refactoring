import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export const postWriteAPI = (data: any) => {
  return axios.post('post/', data);
};

export const loadPostsAPI = () => {
  return axios.get('posts/');
};

export const loadPostAPI = (id: string) => {
  return axios.get(`post/${id}`);
};
