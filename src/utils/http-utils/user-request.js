import axios from 'axios';

const apiUrl = 'http://localhost:3005/vehicles';

export function getAllVehicles() {
  return axios.get(apiUrl);
}

export function getVehicleById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export function deleteVehicleById(id) {
  return axios.delete(`${apiUrl}/${id}`);
}
