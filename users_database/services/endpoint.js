import axios from 'axios';

const baseURL = 'https://6180472f8bfae60017adfa54.mockapi.io';


export const getUserDatabase = async () => axios.get(`${baseURL}/users`);

export const addUserEP = async (payload) => axios.post(
  `${baseURL}/users`, payload,
);

export const editSubmitEP = async (payload, id) => axios.put(`${baseURL}/users/${id}`, payload,
);