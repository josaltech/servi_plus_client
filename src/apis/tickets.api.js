import axios from "axios";
const TICKETS_API_URL =
  "https://servi-plus-server.herokuapp.com/api/v1/tickets" ||
  process.env.REACT_APP_TICKETS_API_URL;
console.log(TICKETS_API_URL);

export const createTicketRequest = async (task, token) =>
  await axios({
    method: "POST",
    url: TICKETS_API_URL,
    data: task,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllTicketsRequest = async (token) =>
  await axios({
    method: "GET",
    url: TICKETS_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getOneTicketRequest = async (id, token) =>
  await axios.get({
    url: `${TICKETS_API_URL}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateTicketRequest = async (id, newFields, token) =>
  await axios({
    method: "PUT",
    url: `${TICKETS_API_URL}/${id}`,
    data: newFields,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteTicketRequest = async (id, token) =>
  await axios({
    method: "DELETE",
    url: `${TICKETS_API_URL}/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
