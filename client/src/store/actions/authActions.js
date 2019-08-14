import { authConstants } from "../constants/authConstants";
import { authentication } from "../../services/authentication";

export const login = (email, password) => {
  return dispatch => {
    dispatch(request());
    authentication.login(email, password).then(
      user => {
        dispatch(success(user));
      },
      error => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: authConstants.LOGIN_REQUEST };
  }
  function success(user) {
    return { type: authConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: authConstants.LOGIN_FAILURE, error };
  }
};

export const logout = () => {
  authentication.logout();
  return { type: authConstants.LOGOUT };
};
