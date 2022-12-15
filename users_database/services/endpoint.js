import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_DATABASE_BASEURL;


export const getUserDatabase = async () => axios.get(`${baseURL}/users`);

export const addUserEP = async (payload) => axios.post(
  `${baseURL}/users`, payload,
);

export const editSubmitEP = async (payload, id) => axios.put(`${baseURL}/users/${id}`, payload,
);