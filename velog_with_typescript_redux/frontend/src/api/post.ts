import axios from 'axios';

export const postWriteAPI = (data: any) => {
  return axios.post('post/', data);
};
