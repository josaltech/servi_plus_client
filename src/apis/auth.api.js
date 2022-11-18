import axios from "axios";

const AUTH_API_URL =
  "https://servi-plus-server.herokuapp.com/api/v1/auth" ||
  process.env.REACT_APP_AUTH_API_URL;

export const registerRequest = async (email, password) =>
  await axios.post(`${AUTH_API_URL}/register`, { email, password });

export const loginRequest = async (email, password) =>
  await axios.post(`${AUTH_API_URL}/login`, { email, password });
