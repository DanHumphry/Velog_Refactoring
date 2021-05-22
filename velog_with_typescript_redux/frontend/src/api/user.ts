import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export const sendEmailAPI = (data: { email: string; number: number }) => {
  return axios.post('sendMail', data);
};

export const signUpAPI = (data: { email: string; password: string }) => {
  return axios.post('/user/signUp', data);
};

export const logInAPI = (data: { email: string; password: string }) => {
  return axios.post('/user/login', data);
};

export const logOutAPI = () => {
  return axios.post('/user/logout');
};

export const updateProfileAPI = (data: any) => {
  return axios.patch('user/update', data);
};

export const updateProfileImgAPI = (data: FormData) => {
  return axios.post('user/update/image', data);
};

export const emailCheckAPI = (data: { email: string }) => {
  return axios.post('user/findEmail', data);
};

export const getUser = () => {
  return axios.get('user/getUser');
};

export const googleAPI = () => {
  window.location.href = 'http://localhost:3065/user/auth/google';
};

export const kakaoAPI = () => {
  window.location.href = 'http://localhost:3065/user/auth/kakao';
};

export const githubAPI = () => {
  window.location.href = 'http://localhost:3065/user/auth/github';
};
