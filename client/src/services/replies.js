import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const replyServices = {
  post,
  postVote,
  getById,
  remove
};

function post(reply, postId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ reply, postId })
  };

  return fetch("/api/replies", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function remove(replyId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ replyId })
  };

  return fetch("/api/replies/", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function postVote(replyId, isUp) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ replyId, isUp })
  };

  return fetch("/api/replies/votes", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function getById(replyId) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch("/api/replies/" + replyId, requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
