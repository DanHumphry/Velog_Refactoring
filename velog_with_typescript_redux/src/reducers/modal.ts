export const initialState = {
  loginModal: false,
};

export const SET_LOGIN_MODAL = 'SET_LOGIN_MODAL';

function Modal(state = initialState, action: any) {
  switch (action.type) {
    case SET_LOGIN_MODAL:
      return { ...state, loginModal: action.data };
      break;
    default:
      return state;
  }
}

export default Modal;
