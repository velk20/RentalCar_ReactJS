import axios from 'axios';

const apiUrl = 'http://localhost:3005/rents';

//Vehicles

export function getAllRents() {
  return axios.get(apiUrl);
}

export function getRentById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export function deleteRentById(id) {
  return axios.delete(`${apiUrl}/${id}`);
}

export function saveRent(rent) {
  if (rent.id) {
    return axios.put(`${apiUrl}/${rent.id}`, rent);
  }
  return axios.post(`${apiUrl}`, rent);
}

export const orderStatus = {
  InProgress: 'In Progress',
  Canceled: 'Canceled',
  Finished: 'Finished',
  WaitingConfirm: 'Awaiting Confirmation',
};
