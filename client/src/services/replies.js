import { handleResponse } from "../utils/handleRespnse";
import { authHeader } from "../utils/authHeader";

export const replyServices = {
  add
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
