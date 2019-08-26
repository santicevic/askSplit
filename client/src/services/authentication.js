import { handleResponse } from "../utils/handleRespnse";

export const authentication = {
  login,
  register,
  logout,
  usernameExists,
  emailExists
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  };

  return fetch("/api/authentication/login", requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    })
    .catch(error => {
      throw error;
    });
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch("/api/authentication/register", requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function logout() {
  localStorage.removeItem("user");
}

function usernameExists(username) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(`/api/authentication/usernameexists/${username}`, requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}

function emailExists(email) {
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(`/api/authentication/emailexists/${email}`, requestOptions)
    .then(handleResponse)
    .catch(error => {
      throw error;
    });
}
