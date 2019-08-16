import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const postServices = {
  getAll,
  getById,
  add,
  reaction,
  getScore
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

function getById(postId, userId) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(
    "http://localhost:8000/api/posts/" + postId + "/" + userId,
    requestOptions
  )
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

function reaction(postId, isUp) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ postId, isUp })
  };

  return fetch("http://localhost:8000/api/posts/reaction", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function getScore(postId) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(
    "http://localhost:8000/api/posts/score/" + postId,
    requestOptions
  )
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
