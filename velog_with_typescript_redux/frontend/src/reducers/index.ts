import { combineReducers } from 'redux';
import user from '@reducers/user';
import post from '@reducers/post';

const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
