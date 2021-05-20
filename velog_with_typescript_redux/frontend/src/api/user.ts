import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
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

export const logOutAPI = () => {
  return axios.post('/user/logout');
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

export const googleAPI = () => {
  return axios
    .get('user/auth/google')
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};
