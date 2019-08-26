import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const postServices = {
  get,
  getById,
  post,
  update,
  remove,
  postVote
};

function get(offset, tagName = "None") {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  const NUMBER_OF_RECORS_TO_GET = 4;

  return fetch(
    `/api/posts/${offset}/${NUMBER_OF_RECORS_TO_GET}?tagName=${tagName}`,
    requestOptions
  )
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

  return fetch("/api/posts/" + postId, requestOptions)
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

  return fetch("/api/posts", requestOptions)
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

  return fetch("/api/posts/", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function remove(postId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ postId })
  };

  return fetch("/api/posts/", requestOptions)
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

  return fetch("/api/posts/votes", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
