import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const postServices = {
  getAll,
  add
};

function getAll() {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch("http://localhost:8000/api/posts", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function add(post) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(post)
  };

  return fetch("http://localhost:8000/api/posts", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
