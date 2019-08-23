import { notificationConstants } from "../constants/notificationConstants";
import { notificationServices } from "../../services/notifications";

export const getNotifications = () => {
  return (dispatch, getState) => {
    notificationServices.get().then(
      notifications => {
        const sortedByDate = notifications.sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
        );

        if (
          getState().notification.notifications.length < sortedByDate.length
        ) {
          dispatch({
            type: notificationConstants.NEW_UNREAD
          });
        }

        dispatch({
          type: notificationConstants.NOTIFICATION_SUCCESS,
          notifications: sortedByDate
        });
      },
      error => {
        throw error;
      }
    );
  };
};

export const cancelUnread = () => {
  return dispatch => {
    dispatch({
      type: notificationConstants.CANCEL_UNREAD
    });
  };
};
