import { notificationConstants } from "../constants/notificationConstants";
import { notificationServices } from "../../services/notifications";

export const getNotifications = () => {
  return dispatch => {
    notificationServices.get().then(
      notifications => {
        const notificationsSortedByDate = notifications.sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
        );
        dispatch({
          type: notificationConstants.NOTIFICATION_SUCCESS,
          notifications: notificationsSortedByDate
        });
      },
      error => {
        throw error;
      }
    );
  };
};

export const readNotification = notification => {
  notificationServices.markAsRead(notification).then(() => {
    getNotifications();
  });
};
