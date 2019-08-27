import { notificationConstants } from "../constants/notificationConstants";
import { notificationServices } from "../../services/notifications";

export const getNotifications = () => {
  return (dispatch, prevState) => {
    notificationServices.get().then(
      notifications => {
        const notificationsSortedByDate = notifications.sort((a, b) =>
          a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0
        );

        dispatch(
          handleShowNewNotfications(
            prevState().notification.notifications,
            notificationsSortedByDate
          )
        );

        const NOTIFICATION_SHOW_DURATION = 4000;
        setTimeout(
          () => dispatch({ type: notificationConstants.NOTIFICATION_HIDE }),
          NOTIFICATION_SHOW_DURATION
        );

        dispatch({
          type: notificationConstants.NOTIFICATION_LOAD,
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

function handleShowNewNotfications(prevNotifications, newNotifications) {
  if (prevNotifications.length === 0) {
    return { type: notificationConstants.NOTIFICATION_EMPTY };
  }

  const notificationsToShow = newNotifications
    .filter(
      ({ id: id1 }) => !prevNotifications.some(({ id: id2 }) => id2 === id1)
    )
    .filter(notification => !notification.read);

  if (notificationsToShow.length > 0) {
    return {
      type: notificationConstants.NOTIFICATION_SHOW,
      notificationsToShow
    };
  }
  return { type: notificationConstants.NOTIFICATION_EMPTY };
}
