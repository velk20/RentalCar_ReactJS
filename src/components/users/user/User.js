import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../utils/http-utils/user-request';
import { UserCard } from '../user-card/UserCard';
import './User.scss';

export function User(props) {
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(params.id).then((res) => setUser(res.data));
  }, [params.id]);
  return (
    <div className="user">
      <div>
        <UserCard user={user} />
      </div>
    </div>
  );
}
