import { notificationConstants } from "../constants/notificationConstants";

let initialState = {
  notifications: []
};

export function notification(state = initialState, action) {
  switch (action.type) {
    case notificationConstants.NOTIFICATION_LOAD:
      return {
        ...state,
        notifications: [...action.notifications]
      };
    default:
      return state;
  }
}
