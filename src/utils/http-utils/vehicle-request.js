import axios from 'axios';

const apiUrl = 'http://localhost:3388/vehicles';

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

export async function saveVehicle(vehicle) {
  if (vehicle.id) {
    return await axios.put(`${apiUrl}/${vehicle.id}`, vehicle);
  }
  return await axios.post(`${apiUrl}`, vehicle);
}
