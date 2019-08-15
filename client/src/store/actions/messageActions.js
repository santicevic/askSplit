import { messageConstants } from "../constants/messageConstants";

export const showMessage = (message, duration = 3000) => {
  return dispatch => {
    dispatch(messageShow(message));

    setTimeout(() => dispatch(messageHide()), duration);
  };

  function messageShow(message) {
    return { type: messageConstants.MESSAGE_SHOW, msg: message };
  }
  function messageHide() {
    return { type: messageConstants.MESSAGE_HIDE };
  }
};
