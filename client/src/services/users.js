import { handleResponse } from "../utils/handleRespnse";

export const userServices = {
  getByUsername
};

function getByUsername(username) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch("http://localhost:8000/api/users/" + username, requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
