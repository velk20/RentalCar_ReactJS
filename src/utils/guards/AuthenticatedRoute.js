import { Navigate } from 'react-router-dom';
import { getLoggedUser } from '../http-utils/user-request';


export function AuthenticatedRoute({ children }) {
  const user = getLoggedUser();
  const url = window.location.href;

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}
