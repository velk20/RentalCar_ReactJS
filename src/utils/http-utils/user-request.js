import axios from 'axios';

const apiUrl = 'http://localhost:3005/vehicles';

export function getAllVehicles() {
  return axios.get(apiUrl);
}
