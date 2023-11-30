import axios from 'axios';

const apiUrl = 'http://localhost:3005/rents';

//Vehicles

export function getAllRents() {
  return axios.get(apiUrl);
}

export function getRentById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export async function deleteRentById(id) {
  return await axios.delete(`${apiUrl}/${id}`);
}

export async function saveRent(rent) {
  if (rent.id) {
    return await axios.put(`${apiUrl}/${rent.id}`, rent);
  }
  return await axios.post(`${apiUrl}`, rent);
}

export const orderStatus = {
  InProgress: 'In Progress',
  Canceled: 'Canceled',
  Finished: 'Finished',
  WaitingConfirm: 'Awaiting Confirmation',
};
