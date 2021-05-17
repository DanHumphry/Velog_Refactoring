import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.withCredentials = true;

export const signUpAPI = (data: { email: string; username: string; password: string }) => {
  return axios.post('/user/signUp', data);
};

export const logInAPI = (data: { username: string; password: string }) => {
  return axios.post('/user/login', data);
};
