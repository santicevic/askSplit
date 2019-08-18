import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const postServices = {
  getAll,
  getById,
  post,
  update,
  postVote
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

function getById(postId) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch("http://localhost:8000/api/posts/" + postId, requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function post(post) {
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

function update(post) {
  const requestOptions = {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(post)
  };

  return fetch("http://localhost:8000/api/posts/", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function postVote(postId, isUp) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ postId, isUp })
  };

  return fetch("http://localhost:8000/api/posts/votes", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
