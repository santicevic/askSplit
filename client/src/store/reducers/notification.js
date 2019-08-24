import { notificationConstants } from "../constants/notificationConstants";

let initialState = {
  notifications: [],
  show: false,
  newNotifications: []
};

export function notification(state = initialState, action) {
  switch (action.type) {
    case notificationConstants.NOTIFICATION_LOAD:
      return {
        ...state,
        notifications: [...action.notifications]
      };
    case notificationConstants.NOTIFICATION_SHOW:
      return {
        ...state,
        show: true,
        newNotifications: [...action.notificationsToShow]
      };
    case notificationConstants.NOTIFICATION_HIDE:
      return {
        ...state,
        show: false,
        newNotifications: []
      };
    case notificationConstants.NOTIFICATION_EMPTY:
      return state;
    default:
      return state;
  }
}
