import { messageConstants } from "../constants/messageConstants";

export const showMessage = (message, color = "#99ffad") => {
  const MESSAGE_DURATION = 3000;

  return dispatch => {
    dispatch(messageShow(message, color));
    setTimeout(() => dispatch(messageHide()), MESSAGE_DURATION);
  };

  function messageShow(message, color) {
    return { type: messageConstants.MESSAGE_SHOW, msg: message, color };
  }
  function messageHide() {
    return { type: messageConstants.MESSAGE_HIDE };
  }
};
