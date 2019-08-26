import React from "react";
import { connect } from "react-redux";
import Notification from "./Notification";
import { readNotification } from "../../store/actions/notificationActions";

const NotificationPopup = props => {
  return (
    <>
      {props.showNotification && (
        <div className="notification-popup">
          {props.newNotifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
              onClick={() => readNotification(notification)}
            />
          ))}
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  newNotifications: state.notification.newNotifications,
  showNotification: state.notification.show
});

export default connect(mapStateToProps)(NotificationPopup);
