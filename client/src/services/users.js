import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const userServices = {
  getByUsername,
  uploadImage
};

function getByUsername(username) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch("/api/users/" + username, requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function uploadImage(image) {
  let formData = new FormData();
  formData.append("userImage", image);

  const requestOptions = {
    method: "PATCH",
    body: formData,
    headers: { ...authHeader() }
  };

  return fetch("/api/uploads/users", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
