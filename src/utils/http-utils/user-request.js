import axios from 'axios';

const apiUrlUsers = 'http://localhost:3005/users';

const loggedUserKey = 'loggedUser';
//Users

export function getLoggedUser() {
  return JSON.parse(localStorage.getItem('loggedUser'));
}

export async function logout() {
  localStorage.removeItem(loggedUserKey);
}

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

export async function registerUser(user) {
  const existingUsers = (await axios.get(`${apiUrlUsers}?email=${user.email}`))
    .data;

  if (existingUsers.length > 0) {
    throw new Error('User with this email already exist');
  }

  return saveUser(user);
}

export async function login(user) {
  const allUsers = (await getAllUsers()).data;

  const foundUser = allUsers.find(
    (u) => u.email === user.email && u.password === user.password
  );

  if (!foundUser) {
    throw new Error('Invalid username/password');
  }

  localStorage.setItem(loggedUserKey, JSON.stringify(foundUser));

  return foundUser;
}
