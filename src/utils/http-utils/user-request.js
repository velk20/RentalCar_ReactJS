import axios from 'axios';

const apiUrlUsers = 'http://localhost:3005/users';

//Users

export function getAllUsers() {
  return axios.get(apiUrlUsers);
}

export function getUserById(id) {
  return axios.get(`${apiUrlUsers}/${id}`);
}

export function deleteUserById(id) {
  return axios.delete(`${apiUrlUsers}/${id}`);
}

export function saveUser(user) {
  if (!user.picture) {
    user.picture = `https://picsum.photos/200/300?random=${Math.random()}`;
  }

  if (user.id) {
    return axios.put(`${apiUrlUsers}/${user.id}`, user);
  }
  return axios.post(`${apiUrlUsers}`, user);
}

export function registerUser(user) {
  return axios.post(`${apiUrlUsers}/${id}`);
}
