import { combineReducers } from 'redux';
import user from '@reducers/user';
import post from '@reducers/post';
import modal from '@reducers/modal';

const rootReducer = combineReducers({
  user,
  post,
  modal,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
