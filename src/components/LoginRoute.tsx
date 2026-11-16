import { Navigate } from 'react-router';
import LoginPage from '../pages/LoginPage';

const LoginRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to='/' replace /> : <LoginPage />
}

export default LoginRoute;
