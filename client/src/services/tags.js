import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const tagServices = {
  getAll,
  post
};

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch("http://localhost:8000/api/tags", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function post(name) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ name })
  };

  return fetch("http://localhost:8000/api/tags", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
