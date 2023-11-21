import { Navigate } from 'react-router-dom';
import { getLoggedUser } from '../http-utils/user-request';

const homePageUrl = 'http://localhost:3000/';
const vehiclesPageUrl = 'http://localhost:3000/vehicles-list';

export function AuthenticatedRoute({ children }) {
  const user = getLoggedUser();
  const url = window.location.href;

  if (!user) {
    // if (url !== homePageUrl && url !== vehiclesPageUrl) {
    // }
    return <Navigate to="/login" />;
  }

  return children;
}
