import { useEffect, useState } from 'react';
import {
  deleteUserById,
  getAllUsers,
} from '../../../utils/http-utils/user-request.js';
import { UserCard } from '../user-card/UserCard';
import './UsersList.scss';

export function UsersList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUserById(id);
      setUsers((pervState) => {
        return pervState.filter((user) => user.id !== id);
      });
    }
  };

  return (
    <div className="users-list-wrapper">
      {users.map((user) => (
        <UserCard key={user.id} user={user} deleteUser={deleteUserHandler} />
      ))}
    </div>
  );
}
