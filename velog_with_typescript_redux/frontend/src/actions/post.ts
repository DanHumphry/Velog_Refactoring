import { ADD_POST_REQUEST, ADD_POST_FAILURE, ADD_POST_SUCCESS } from '@reducers/post';

export const ADD_POST_REQUEST_ACTION = () => ({ type: ADD_POST_REQUEST });
export const ADD_POST_SUCCESS_ACTION = (data: any) => ({ type: ADD_POST_SUCCESS, data });
export const ADD_POST_FAILURE_ACTION = (error: Error | any) => ({ type: ADD_POST_FAILURE, data: error });
