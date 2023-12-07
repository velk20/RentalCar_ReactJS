import { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {deleteUserById, getUserById} from '../../../utils/http-utils/user-request';
import { UserCard } from '../user-card/UserCard';
import './User.scss';

export function User(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(params.id).then((res) => setUser(res.data));
  }, [params.id]);

  const deleteUserHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUserById(id);
      navigate('/users-list')
    }
  };


  return (
    <div className="user">
      <div>
        <UserCard user={user} deleteUser={deleteUserHandler} isDetailsAvailable={true}/>
      </div>
    </div>
  );
}
