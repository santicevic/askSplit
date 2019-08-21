import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const replyCommentServices = {
  post,
  remove
};

function post(replyComment, replyId) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ replyComment, replyId })
  };

  return fetch("http://localhost:8000/api/replycomments", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function remove(commentId) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify({ commentId })
  };

  return fetch("http://localhost:8000/api/replycomments/", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
