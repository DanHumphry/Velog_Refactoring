import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export const sendEmailAPI = (data: { email: string; number: number }) => {
  return axios.post('sendMail', data);
};

export const signUpAPI = (data: { email: string; username: string; password: string }) => {
  return axios.post('/user/signUp', data);
};

export const logInAPI = (data: { username: string; password: string }) => {
  return axios.post('/user/login', data);
};

export const updateProfileAPI = (data: any) => {
  return axios.patch('user/update', data);
};

export const updateProfileImgAPI = (data: FormData) => {
  return axios.post('user/update/image', data);
};

export const usernameCheckAPI = (data: { username: string }) => {
  return axios.post('user/findUsername', data);
};
