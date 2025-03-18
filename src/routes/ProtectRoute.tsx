import { Navigate } from 'react-router';
import { getLocalStorage } from '../utils/localStorage';



interface IProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const isAuthenticated = () => {
    const token = getLocalStorage('token');

    if (!token) {
      return false;
    }

    return true;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
export default ProtectedRoute;
