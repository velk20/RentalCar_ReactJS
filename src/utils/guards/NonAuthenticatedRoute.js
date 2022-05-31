import { Navigate } from 'react-router-dom';
import { getLoggedUser } from '../http-utils/user-request';

export function NonAuthenticatedRoute({ children }) {
  const user = getLoggedUser();

  if (user) {
    return <Navigate to="/" />;
  }
  return children;
}
