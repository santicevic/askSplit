import { notificationConstants } from "../constants/notificationConstants";

let initialState = {
  notifications: [],
  unread: false
};

export function notification(state = initialState, action) {
  switch (action.type) {
    case notificationConstants.NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [...action.notifications]
      };
    case notificationConstants.NEW_UNREAD:
      return {
        ...state,
        unread: true
      };
    case notificationConstants.CANCEL_UNREAD:
      return {
        ...state,
        unread: false
      };
    default:
      return state;
  }
}
