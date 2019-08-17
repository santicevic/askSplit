import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const replyServices = {
  add,
  getVote,
  getScore
};

function add(reply, postId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ reply, postId })
  };

  return fetch("http://localhost:8000/api/replies", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function getScore(replyId) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(
    "http://localhost:8000/api/replies/scores/" + replyId,
    requestOptions
  )
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function getVote(replyId) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json", ...authHeader() }
  };

  return fetch(
    "http://localhost:8000/api/replies/votes/" + replyId,
    requestOptions
  )
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
