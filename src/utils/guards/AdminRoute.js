import { Navigate } from 'react-router-dom';
import { getLoggedUser } from '../http-utils/user-request';

export function AdminRoute({ children }) {
  const user = getLoggedUser();

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}
