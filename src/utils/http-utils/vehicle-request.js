import axios from 'axios';

const apiUrl = 'http://localhost:3005/vehicles';

//Vehicles

export function getAllVehicles() {
  return axios.get(apiUrl);
}

export function getVehicleById(id) {
  return axios.get(`${apiUrl}/${id}`);
}

export function deleteVehicleById(id) {
  return axios.delete(`${apiUrl}/${id}`);
}

export function saveVehicle(vehicle) {
  if (vehicle.id) {
    return axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
  }
  return axios.post(`${apiUrl}`, vehicle);
}
