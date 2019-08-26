import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const notificationServices = {
  get,
  markAsRead
};

function get() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeader() }
  };

  return fetch("/api/notifications/", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function markAsRead(notification) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(notification)
  };

  return fetch("/api/notifications/", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
