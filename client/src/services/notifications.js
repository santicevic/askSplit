import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const notificationServices = {
  get
};

function get() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeader() }
  };

  return fetch("http://localhost:8000/api/notifications/", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
