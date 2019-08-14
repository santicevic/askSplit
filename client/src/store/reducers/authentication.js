import { authConstants } from "../constants/authConstants";
import Role from "../../utils/role";

let user = JSON.parse(localStorage.getItem("user"));

let initialState = {
  loggedIn: false,
  loading: false,
  user: { role: Role.Guest }
};

if (user) {
  if (Role.hasOwnProperty(user.role)) {
    initialState = {
      loggedIn: true,
      loading: false,
      user
    };
  }
}

export function authentication(state = initialState, action) {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: false,
        loading: true
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loading: false,
        user: action.user
      };
    case authConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        loading: false,
        user: { role: "Guest" }
      };
    case authConstants.LOGOUT:
      return {
        loggedIn: false,
        user: { role: "Guest" }
      };
    default:
      return state;
  }
}
