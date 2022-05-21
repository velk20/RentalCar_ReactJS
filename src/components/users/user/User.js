import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../../utils/http-utils/user-request';
import { UserCard } from '../user-card/UserCard';

export function User(props) {
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(params.id).then((res) => setUser(res.data));
  }, [params.id]);
  return (
    <div className="user">
      <UserCard user={user} />
    </div>
  );
}
