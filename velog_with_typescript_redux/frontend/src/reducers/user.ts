export const initialState = {
  loginModal: false,
  accountText: false,

  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  updateProfileLoading: false, // 프로필 업데이트 시도중
  updateProfileDone: false,
  updateProfileError: null,
  updateProfileImgLoading: false, // 프로필 업데이트 시도중
  updateProfileImgDone: false,
  updateProfileImgError: null,

  userInfo: [
    { id: 0, username: '1234', password: '1234', email: '', mygit: '', nickname: '1234', myInfo: '', userPhoto: '' },
  ],
  me: {},
};

export const SET_LOGIN_MODAL = 'SET_LOGIN_MODAL';
export const SET_ACCOUNT_TEXT = 'SET_ACCOUNT_TEXT';

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

export const UPDATE_PROFILE_IMG_REQUEST = 'UPDATE_PROFILE_IMG_REQUEST';
export const UPDATE_PROFILE_IMG_SUCCESS = 'UPDATE_PROFILE_IMG_SUCCESS';
export const UPDATE_PROFILE_IMG_FAILURE = 'UPDATE_PROFILE_IMG_FAILURE';

export default function User(state = initialState, action: any) {
  switch (action.type) {
    case SET_LOGIN_MODAL:
      return { ...state, loginModal: action.data, accountText: false };
      break;
    case SET_ACCOUNT_TEXT:
      return { ...state, accountText: action.data };

    case LOG_IN_REQUEST:
      return { ...state, logInLoading: true, logInDone: false, logInError: null };
      break;
    case LOG_IN_SUCCESS:
      return { ...state, logInLoading: false, logInDone: true, logInError: null, loginModal: false, me: action.data };
      break;
    case LOG_IN_FAILURE:
      return { ...state, logInLoading: false, logInDone: false, logInError: action.data };
      break;

    case SIGN_UP_REQUEST:
      return { ...state, signUpLoading: true, signUpDone: false, signUpError: null };
      break;
    case SIGN_UP_SUCCESS:
      return { ...state, signUpLoading: false, signUpDone: true, signUpError: null, accountText: false };
      break;
    case SIGN_UP_FAILURE:
      return { ...state, signUpLoading: false, signUpDone: false, signUpError: action.data };
      break;

    case LOG_OUT_REQUEST:
      return { ...state, logOutLoading: true, logOutDone: false, logOutError: null };
      break;
    case LOG_OUT_SUCCESS:
      return { ...state, logOutLoading: false, logOutDone: true, logOutError: null, me: null };
      break;
    case LOG_OUT_FAILURE:
      return { ...state, logOutLoading: false, logOutDone: false, logOutError: action.data };
      break;

    case UPDATE_PROFILE_REQUEST:
      return { ...state, updateProfileLoading: true, updateProfileDone: false, updateProfileError: null };
      break;
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileDone: true,
        updateProfileError: null,
        me: action.data,
      };
      break;
    case UPDATE_PROFILE_FAILURE:
      return { ...state, updateProfileLoading: false, updateProfileDone: false, updateProfileError: action.data };

    case UPDATE_PROFILE_IMG_REQUEST:
      return { ...state, updateProfileImgLoading: true, updateProfileImgDone: false, updateProfileImgError: null };
    case UPDATE_PROFILE_IMG_SUCCESS:
      return {
        ...state,
        updateProfileImgLoading: false,
        updateProfileImgDone: true,
        updateProfileImgError: null,
        me: { ...state.me, profileImg: action.data },
      };
    case UPDATE_PROFILE_IMG_FAILURE:
      return {
        ...state,
        updateProfileImgLoading: false,
        updateProfileImgDone: false,
        updateProfileImgError: action.data,
      };
    default:
      return state;
  }
}
