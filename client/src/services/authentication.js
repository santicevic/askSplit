import { handleResponse } from "../utils/handleRespnse";

export const authentication = {
  login,
  register,
  logout
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return fetch("http://localhost:8000/api/authentication/login", requestOptions)
    .then(handleResponse)
    .then(
      user => {
        localStorage.setItem("user", JSON.stringify(user));

        return user;
      },
      error => {
        throw error;
      }
    );
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(
    "http://localhost:8000/api/authentication/register",
    requestOptions
  )
    .then(handleResponse)
    .then(
      () => true,
      error => {
        throw error;
      }
    );
}

function logout() {
  localStorage.removeItem("user");
}
