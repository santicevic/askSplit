import { handleResponse } from "../utils/handleRespnse";

export const tagServices = {
  getAll
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
