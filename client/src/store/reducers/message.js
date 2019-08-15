import { messageConstants } from "../constants/messageConstants";

let initialState = {
  show: false,
  msg: ""
};

export function message(state = initialState, action) {
  switch (action.type) {
    case messageConstants.MESSAGE_SHOW:
      return {
        show: true,
        msg: action.msg
      };
    case messageConstants.MESSAGE_HIDE:
      return {
        show: false,
        msg: ""
      };
    default:
      return state;
  }
}
