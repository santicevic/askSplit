import React, { Component } from "react";
import { Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { connect } from "react-redux";
import Notification from "./Notification";
import { cancelUnread } from "../../store/actions/notificationActions";

class NotificationDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggle = () => {
    this.setState(state => ({ open: !state.open }));
    this.props.cancelUnread();
  };

  render() {
    return (
      <Dropdown isOpen={this.state.open} toggle={this.toggle}>
        <DropdownToggle>
          Notifications{" "}
          {this.props.unread && (
            <i style={{ color: "red" }} className="far fa-dot-circle" />
          )}
        </DropdownToggle>
        <DropdownMenu
          onClick={this.toggle}
          style={{
            height: "auto",
            maxHeight: "500px",
            width: "300px",
            overflowX: "hidden"
          }}
        >
          {this.props.notifications.length === 0 && (
            <span className="m-1">No notifications</span>
          )}
          {this.props.notifications.map(notification => (
            <Notification key={notification.id} notification={notification} />
          ))}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.notification.notifications,
  unread: state.notification.unread
});

const mapDispatchToProps = {
  cancelUnread
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationDropdown);
