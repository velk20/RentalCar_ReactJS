import { Navigate, useNavigate } from 'react-router-dom';
import { getLoggedUser } from '../http-utils/user-request';

export function AuthenticatedRoute(props, children) {
  const navigate = useNavigate();
  const user = getLoggedUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <props.element {...props} />;
}
