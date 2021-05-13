export const initialState = {
  loginModal: false,
  profileModal: false,
};

export const SET_LOGIN_MODAL = 'SET_LOGIN_MODAL';
export const SET_PROFILE_MODAL = 'SET_PROFILE_MODAL';

function Modal(state = initialState, action: any) {
  switch (action.type) {
    case SET_LOGIN_MODAL:
      return { ...state, loginModal: action.data };
      break;
    case SET_PROFILE_MODAL:
      return { ...state, profileModal: action.data };
      break;
    default:
      return state;
  }
}

export default Modal;
