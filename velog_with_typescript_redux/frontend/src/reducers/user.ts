export const initialState = {
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  updateProfileLoading: false, // 회원가입 시도중
  updateProfileDone: false,
  updateProfileError: null,

  userInfo: [
    { id: 0, username: '1234', password: '1234', email: '', mygit: '', nickname: '1234', myInfo: '', userPhoto: '' },
  ],
  me: null,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

function User(state = initialState, action: any) {
  switch (action.type) {
    case LOG_IN_REQUEST:
      return { ...state, logInLoading: true, logInDone: false, logInError: null };
      break;
    case LOG_IN_SUCCESS:
      return { ...state, logInLoading: false, logInDone: true, logInError: null, me: action.data };
      break;
    case LOG_IN_FAILURE:
      return { ...state, logInLoading: false, logInDone: false, logInError: action.error };
      break;

    case LOG_OUT_REQUEST:
      return { ...state, logOutLoading: true, logOutDone: false, logOutError: null };
      break;
    case LOG_OUT_SUCCESS:
      return { ...state, logOutLoading: false, logOutDone: true, logOutError: null, me: null };
      break;
    case LOG_OUT_FAILURE:
      return { ...state, logOutLoading: false, logOutDone: false, logOutError: action.error };
      break;

    case SIGN_UP_REQUEST:
      return { ...state, signUpLoading: true, signUpDone: false, signUpError: null };
      break;
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        signUpError: null,
        userInfo: [...state.userInfo, action.data],
      };
      break;
    case SIGN_UP_FAILURE:
      return { ...state, signUpLoading: false, signUpDone: false, signUpError: action.error };
      break;

    case UPDATE_PROFILE_SUCCESS: {
      console.log(action.data);
      const temp = [...state.userInfo];
      const idx = temp.findIndex((v) => v === state.me);
      console.log(idx);
      temp.splice(idx, 1, action.data);
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileDone: true,
        updateProfileError: null,
        userInfo: temp,
        me: action.data,
      };
    }
    default:
      return state;
  }
}

export default User;
