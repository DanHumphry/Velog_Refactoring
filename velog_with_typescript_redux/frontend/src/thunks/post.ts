import { ADD_POST_REQUEST_ACTION, ADD_POST_FAILURE_ACTION, ADD_POST_SUCCESS_ACTION } from '@actions/post';
import * as postAPI from '@api/post';

export const ADD_POST_REQUEST = (v: any) => async (dispatch: any) => {
  try {
    dispatch(ADD_POST_REQUEST_ACTION());
    const res = await postAPI.postWriteAPI(v);
    dispatch(ADD_POST_SUCCESS_ACTION(res.data));
  } catch (error) {
    dispatch(ADD_POST_FAILURE_ACTION(error.response.data));
  }
};
