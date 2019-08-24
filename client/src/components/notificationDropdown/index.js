import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { connect } from "react-redux";
import Notification from "./Notification";
import { readNotification } from "../../store/actions/notificationActions";
import "../../styles/Dropdown.css";

class NotificationDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const hasUnreadNotifications =
      this.props.notifications.filter(notification => !notification.read)
        .length > 0;
    return (
      <Dropdown isOpen={this.state.open} toggle={this.toggle}>
        <DropdownToggle>
          Notifications
          {hasUnreadNotifications && (
            <i className="far fa-dot-circle text-danger m-1" />
          )}
        </DropdownToggle>
        <DropdownMenu onClick={this.toggle} className="dropdown-menu">
          {this.props.notifications.length === 0 && (
            <span className="m-1">No notifications</span>
          )}
          {this.props.notifications.map(notification => (
            <Notification
              key={notification.id}
              notification={notification}
              onClick={() => readNotification(notification)}
            />
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notification.notifications
});

export default connect(mapStateToProps)(NotificationDropdown);
